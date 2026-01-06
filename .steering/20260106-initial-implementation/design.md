# 実装設計 - Initial Implementation

## 技術スタック

| カテゴリ | 技術 | バージョン目安 |
|---------|------|---------------|
| フレームワーク | Astro | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| シンタックスハイライト | Shiki | (Astro内蔵) |
| パッケージマネージャー | pnpm | 9.x |
| ホスティング | GitHub Pages | - |
| CI/CD | GitHub Actions | - |

---

## アーキテクチャ

### 全体構成

```
┌─────────────────────────────────────────────────┐
│                   GitHub Pages                   │
│              (Static File Hosting)               │
└─────────────────────────────────────────────────┘
                        ▲
                        │ deploy
┌─────────────────────────────────────────────────┐
│                 GitHub Actions                   │
│              (Build & Deploy)                    │
└─────────────────────────────────────────────────┘
                        ▲
                        │ push
┌─────────────────────────────────────────────────┐
│                   Repository                     │
│  ┌─────────────┐  ┌─────────────┐              │
│  │   Astro     │  │  Content    │              │
│  │   Source    │  │  (Markdown) │              │
│  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────┘
```

---

## ディレクトリ構造

```
src/
├── components/
│   ├── common/           # 共通UI (Button, Card, etc.)
│   ├── layout/           # Header, Footer, Navigation
│   ├── blog/             # ブログ関連コンポーネント
│   ├── portfolio/        # ポートフォリオ関連
│   └── ui/               # テーマ切替、言語切替など
├── content/
│   ├── blog/
│   │   ├── ja/           # 日本語記事
│   │   └── en/           # 英語記事
│   ├── projects/
│   │   ├── ja/
│   │   └── en/
│   └── config.ts         # Content Collections定義
├── layouts/
│   ├── BaseLayout.astro  # 基本レイアウト
│   ├── BlogLayout.astro  # ブログ記事用
│   └── PageLayout.astro  # 固定ページ用
├── pages/
│   ├── ja/
│   │   ├── index.astro
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── skills.astro
│   │   └── about.astro
│   ├── en/
│   │   └── (同様の構造)
│   ├── og/               # OGP画像生成エンドポイント
│   └── index.astro       # ルート（リダイレクト）
├── i18n/
│   ├── ui.ts             # UI翻訳
│   ├── ja.json
│   └── en.json
├── lib/
│   ├── i18n.ts           # i18nユーティリティ
│   ├── search.ts         # 検索ロジック
│   └── utils.ts          # 汎用ユーティリティ
└── styles/
    └── global.css        # グローバルスタイル

public/
├── images/
├── fonts/
└── favicon.svg
```

---

## コンポーネント設計

### レイアウト階層

```
BaseLayout
├── <head> (SEO, OGP)
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── LanguageSwitcher
│   └── ThemeToggle
├── <slot /> (ページコンテンツ)
└── Footer
```

### 主要コンポーネント

| コンポーネント | 責務 |
|---------------|------|
| `Header` | ナビゲーション、テーマ・言語切替 |
| `Footer` | コピーライト、SNSリンク |
| `BlogCard` | 記事一覧のカード表示 |
| `ProjectCard` | プロジェクト一覧のカード表示 |
| `TagList` | タグ一覧表示 |
| `SeriesNav` | シリーズ内ナビゲーション |
| `SearchBox` | 検索入力UI |
| `ThemeToggle` | ダーク/ライト切替ボタン |
| `LanguageSwitcher` | 日英切替 |
| `SkillBadge` | スキルアイコン表示 |

---

## データモデル

### Blog記事 (Content Collection)

```typescript
// src/content/config.ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});
```

### Project (Content Collection)

```typescript
const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});
```

---

## 多言語対応設計

### URL構造

| パス | 説明 |
|------|------|
| `/` | デフォルト言語(ja)へリダイレクト |
| `/ja/` | 日本語トップ |
| `/en/` | 英語トップ |
| `/ja/blog/[slug]` | 日本語記事 |
| `/en/blog/[slug]` | 英語記事 |

### 翻訳管理

- UI文字列: `src/i18n/` で管理
- コンテンツ: 言語別ディレクトリで管理

---

## テーマ切替設計

### 実装方針

1. システム設定を初期値として検出
2. LocalStorageに選択を保存
3. `<html>` に `class="dark"` を付与
4. Tailwindの `dark:` で切替

### フラッシュ防止

`<head>` 内でインラインスクリプトを実行し、レンダリング前にテーマを適用。

---

## OGP画像生成

### 実装方針

- `satori` + `sharp` を使用
- `/og/[slug].png` エンドポイントで動的生成
- ビルド時に静的生成

---

## デプロイフロー

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    - checkout
    - setup pnpm
    - install dependencies
    - build (astro build)
    - deploy to GitHub Pages
```
