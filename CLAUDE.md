# mcmc-tech - 技術ブログ兼ポートフォリオ

## プロジェクト概要

GitHub Pagesでホスティングする技術ブログ兼ポートフォリオサイト。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Astro |
| コンテンツ形式 | Markdown |
| スタイリング | Tailwind CSS |
| シンタックスハイライト | Shiki |
| パッケージマネージャー | pnpm |
| デプロイ | GitHub Actions → GitHub Pages |

## プロジェクト構成

```
.
├── CLAUDE.md              # このファイル
├── docs/                  # 仕様書・設計ドキュメント
│   └── ...
├── .steering/             # 作業用ディレクトリ（日付ベース）
│   └── [YYYY-MM-DD]-xxx/  # 例: 2024-01-15-css-fix/
└── src/                   # Astroソースコード
```

### `.steering/` ディレクトリについて

作業ごとにディレクトリを作成し、作業メモや一時ファイルを管理する。

命名規則: `[YYYY-MM-DD]-作業内容`

例:
- `2024-01-15-initial-setup/`
- `2024-01-16-blog-component/`
- `2024-01-17-css-fix/`

## 機能要件

### ブログ機能
- [ ] タグ機能（記事の分類・フィルタリング）
- [ ] 記事検索（キーワード検索）
- [ ] シリーズ機能（関連記事のグルーピング）
- [ ] OGP画像自動生成（記事タイトルから動的に生成）

### ポートフォリオ機能
- [ ] プロジェクト一覧（カード形式で過去の制作物を表示）
- [ ] スキル一覧（技術スタックのビジュアル表示）
- [ ] 自己紹介ページ（About）

### UI/UX
- [ ] ダーク/ライトモード切替
- [ ] 多言語対応（日本語 / English）
- [ ] ミニマルなデザイン
- [ ] レスポンシブ対応

## ディレクトリ構成（Astro）

```
src/
├── components/       # 共通コンポーネント
├── content/
│   ├── blog/         # ブログ記事 (Markdown)
│   │   ├── ja/       # 日本語記事
│   │   └── en/       # 英語記事
│   └── projects/     # プロジェクト情報
├── layouts/          # レイアウト
├── pages/
│   ├── ja/           # 日本語ページ
│   └── en/           # 英語ページ
├── i18n/             # 翻訳ファイル
└── styles/           # グローバルスタイル
public/
├── images/           # 画像アセット
└── fonts/            # フォント（必要に応じて）
```

## コマンド

```bash
pnpm install          # 依存関係インストール
pnpm dev              # 開発サーバー起動
pnpm build            # 本番ビルド
pnpm preview          # ビルド結果のプレビュー
```

## 開発ガイドライン

### ブログ記事のフロントマター

```yaml
---
title: "記事タイトル"
description: "記事の説明"
pubDate: 2024-01-01
updatedDate: 2024-01-02  # 任意
tags: ["astro", "typescript"]
series: "シリーズ名"      # 任意
draft: false
---
```

### 多言語対応

- デフォルト言語: 日本語
- 対応言語: 日本語 (ja), 英語 (en)
- URL構造: `/ja/blog/...`, `/en/blog/...`

### コーディング規約

- TypeScript を使用
- コンポーネントは `.astro` 形式を基本とする
- Tailwind CSS のユーティリティクラスを活用
- アクセシビリティ（a11y）を考慮

## 不要な機能（スコープ外）

- コメント機能
- アナリティクス
- RSS フィード

## 参考リンク

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Pages](https://pages.github.com/)
