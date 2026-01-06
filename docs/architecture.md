# 技術仕様書

## 技術スタック概要

| レイヤー | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| フレームワーク | Astro | 5.x | 静的サイト生成 |
| 言語 | TypeScript | 5.x | 型安全な開発 |
| スタイリング | Tailwind CSS | 4.x | ユーティリティファーストCSS |
| シンタックスハイライト | Shiki | - | コードブロック装飾 |
| OGP生成 | satori + sharp | - | 動的OGP画像生成 |
| パッケージ管理 | pnpm | 9.x | 高速な依存関係管理 |
| CI/CD | GitHub Actions | - | 自動ビルド・デプロイ |
| ホスティング | GitHub Pages | - | 静的ファイル配信 |

---

## 開発環境

### 必須ツール

| ツール | バージョン | インストール |
|--------|-----------|-------------|
| Node.js | 20.x 以上 | https://nodejs.org/ |
| pnpm | 9.x | `npm install -g pnpm` |
| Git | 最新 | https://git-scm.com/ |

### 推奨エディタ

**Visual Studio Code** + 以下の拡張機能:

| 拡張機能 | 用途 |
|---------|------|
| Astro | Astroファイルのサポート |
| Tailwind CSS IntelliSense | Tailwindの補完 |
| ESLint | リント |
| Prettier | フォーマット |
| EditorConfig | エディタ設定統一 |

### エディタ設定

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["class\\s*=\\s*\"([^\"]*)\"", "\"([^\"]*)\""]
  ]
}
```

---

## ビルドシステム

### Astro設定

`astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/<repository>',  // リポジトリ名がサブパスの場合
  integrations: [tailwind()],
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
```

### Tailwind設定

`tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // カスタムカラー定義
      },
      fontFamily: {
        // カスタムフォント定義
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

### TypeScript設定

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@content/*": ["src/content/*"]
    }
  }
}
```

---

## CI/CD パイプライン

### GitHub Actions ワークフロー

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Content Collections

### スキーマ定義

`src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
```

---

## 多言語対応 (i18n)

### アーキテクチャ

```
┌─────────────────────────────────────────┐
│              Request                     │
│         /ja/blog/my-post                 │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│          Language Detection              │
│   - URL prefix (/ja/, /en/)             │
│   - Fallback to defaultLocale           │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│          Content Resolution              │
│   - Load from content/blog/{lang}/      │
│   - Load UI translations from i18n/     │
└─────────────────────────────────────────┘
```

### 翻訳ユーティリティ

`src/i18n/index.ts`:

```typescript
import ja from './ja.json';
import en from './en.json';

const translations = { ja, en } as const;
type Lang = keyof typeof translations;

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? key;
}

export function getLocaleFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'ja' || lang === 'en') return lang;
  return 'ja';
}
```

---

## テーマシステム

### 実装詳細

1. **初期化** (フラッシュ防止):

```html
<!-- BaseLayout.astro の <head> 内 -->
<script is:inline>
  const theme = localStorage.getItem('theme')
    ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
</script>
```

2. **切替ロジック**:

```typescript
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

3. **Tailwind適用**:

```css
/* dark: プレフィックスで自動切替 */
.card {
  @apply bg-white dark:bg-gray-800;
  @apply text-gray-900 dark:text-gray-100;
}
```

---

## OGP画像生成

### 技術構成

| ライブラリ | 役割 |
|-----------|------|
| satori | HTMLからSVG生成 |
| sharp | SVGからPNG変換 |

### エンドポイント

`src/pages/og/[...slug].png.ts`:

```typescript
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  // 記事データ取得、SVG生成、PNG変換
  // ...
};

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}
```

---

## 検索機能

### クライアントサイド検索

ビルド時に検索用インデックスを生成し、クライアントサイドで検索。

```typescript
// ビルド時に生成される検索インデックス
interface SearchIndex {
  slug: string;
  title: string;
  description: string;
  content: string;  // 本文（プレーンテキスト）
  tags: string[];
  lang: 'ja' | 'en';
}
```

軽量な検索ライブラリ（Fuse.js等）を使用してファジー検索を実装。

---

## パフォーマンス最適化

### 画像最適化

- Astro の Image コンポーネントを使用
- WebP/AVIF 形式での配信
- レスポンシブ画像の提供

### バンドル最適化

- 必要なコンポーネントのみ islands として読み込み
- CSS の Purge（Tailwind標準機能）
- フォントのサブセット化

### キャッシュ戦略

- 静的アセットの長期キャッシュ
- ハッシュ付きファイル名

---

## セキュリティ

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### その他

- 外部リンクには `rel="noopener noreferrer"`
- ユーザー入力のサニタイズ（検索等）
