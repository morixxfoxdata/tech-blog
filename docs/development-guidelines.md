# 開発ガイドライン

## Git運用

### ブランチ戦略

```
main          # 本番環境（GitHub Pages）
├── develop   # 開発統合ブランチ
└── feature/* # 機能開発ブランチ
```

### ブランチ命名規則

| プレフィックス | 用途 | 例 |
|---------------|------|-----|
| `feature/` | 新機能開発 | `feature/blog-search` |
| `fix/` | バグ修正 | `fix/dark-mode-flash` |
| `refactor/` | リファクタリング | `refactor/i18n-structure` |
| `docs/` | ドキュメント更新 | `docs/readme-update` |
| `style/` | スタイル調整 | `style/typography` |
| `chore/` | 雑務・設定変更 | `chore/update-deps` |

### コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/) に準拠。

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type

| Type | 説明 |
|------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `style` | コードの意味に影響しない変更（空白、フォーマット等） |
| `refactor` | バグ修正や機能追加を含まないコード変更 |
| `perf` | パフォーマンス改善 |
| `test` | テスト追加・修正 |
| `chore` | ビルドプロセスや補助ツールの変更 |

#### 例

```bash
feat(blog): add tag filtering functionality

fix(i18n): correct language detection on first visit

docs(readme): update installation instructions

style(header): adjust navigation spacing

refactor(search): extract search logic to utility
```

### プルリクエスト

- タイトルはコミットメッセージと同様の形式
- 変更内容の概要を記載
- 関連するIssueがあればリンク
- セルフレビューを実施してから作成

---

## コーディング規約

### TypeScript

- `strict: true` を有効化
- 明示的な型定義を推奨（`any` は避ける）
- インターフェースは `I` プレフィックスを付けない
- 型は PascalCase、変数・関数は camelCase

```typescript
// Good
type BlogPost = {
  title: string;
  pubDate: Date;
};

// Avoid
type IBlogPost = { ... };
const blog_post = { ... };
```

### Astroコンポーネント

- コンポーネント名は PascalCase
- ファイル名もPascalCase（`BlogCard.astro`）
- Props は型定義を必須とする

```astro
---
interface Props {
  title: string;
  href: string;
}

const { title, href } = Astro.props;
---

<a href={href}>{title}</a>
```

### Tailwind CSS

- ユーティリティクラスを直接使用（カスタムCSSは最小限）
- 長いクラス列は適宜改行
- レスポンシブは `sm:`, `md:`, `lg:` を使用
- ダークモードは `dark:` を使用

```astro
<div
  class="
    flex flex-col gap-4 p-4
    md:flex-row md:gap-8
    dark:bg-gray-900
  "
>
```

### ファイル・ディレクトリ命名

| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `BlogCard.astro` |
| ページ | kebab-case | `about.astro`, `[slug].astro` |
| ユーティリティ | camelCase | `formatDate.ts` |
| 設定ファイル | kebab-case | `tailwind.config.mjs` |
| コンテンツ（記事） | kebab-case | `my-first-post.md` |

---

## ディレクトリ規約

### コンポーネント配置

```
src/components/
├── common/      # 汎用UI（Button, Card, Icon）
├── layout/      # レイアウト系（Header, Footer）
├── blog/        # ブログ専用
├── portfolio/   # ポートフォリオ専用
└── ui/          # インタラクティブUI（ThemeToggle等）
```

### インポートパス

`tsconfig.json` でエイリアスを設定:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

使用例:

```typescript
import BlogCard from '@components/blog/BlogCard.astro';
import { formatDate } from '@lib/utils';
```

---

## コンテンツ作成規約

### ブログ記事

#### ファイル配置

```
src/content/blog/
├── ja/
│   └── my-post.md
└── en/
    └── my-post.md
```

#### フロントマター

```yaml
---
title: "記事タイトル"
description: "記事の説明（SEO用、120文字程度）"
pubDate: 2026-01-06
updatedDate: 2026-01-07  # 更新時のみ
tags: ["astro", "typescript"]
series: "Astro入門"       # シリーズの場合
seriesOrder: 1            # シリーズ内の順番
draft: false              # 下書きの場合 true
---
```

#### 本文

- 見出しは `##` から開始（`#` はタイトル用）
- コードブロックには言語を明記
- 画像は `public/images/blog/` に配置

### プロジェクト

```yaml
---
title: "プロジェクト名"
description: "プロジェクトの説明"
thumbnail: "/images/projects/my-project.png"
technologies: ["React", "TypeScript", "Node.js"]
githubUrl: "https://github.com/..."
demoUrl: "https://..."
featured: true
order: 1
---
```

---

## 品質チェック

### コミット前

- [ ] TypeScriptエラーがないこと
- [ ] Lintエラーがないこと
- [ ] ビルドが通ること

### プルリクエスト前

- [ ] 機能が要件を満たしていること
- [ ] レスポンシブ対応を確認
- [ ] ダーク/ライト両モードで確認
- [ ] 日英両言語で確認

### リリース前

- [ ] Lighthouse スコア確認
- [ ] OGP画像の表示確認
- [ ] リンク切れチェック
