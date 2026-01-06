# tech-blog - 技術ブログ

## プロジェクト概要

GitHub Pagesでホスティングする技術ブログサイト。
[astro-paper](https://github.com/satnaing/astro-paper) テンプレートベース。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| テンプレート | astro-paper |
| フレームワーク | Astro 5.x |
| スタイリング | Tailwind CSS 4.x |
| 検索 | Pagefind |
| OGP生成 | satori + sharp |
| パッケージマネージャー | pnpm |
| デプロイ | GitHub Actions → GitHub Pages |

## プロジェクト構成

```
.
├── CLAUDE.md              # このファイル
├── .steering/             # 作業用ディレクトリ（日付ベース）
│   └── [YYYY-MM-DD]-xxx/  # 例: 2026-01-06-astro-paper-migration/
├── src/                   # Astroソースコード
├── public/                # 静的アセット
└── astro.config.ts        # Astro設定
```

### `.steering/` ディレクトリについて

作業ごとにディレクトリを作成し、作業メモや一時ファイルを管理する。

命名規則: `[YYYY-MM-DD]-作業内容`

## ディレクトリ構成（Astro）

```
src/
├── assets/           # 画像・アイコン
├── components/       # コンポーネント
├── data/
│   └── blog/         # ブログ記事 (Markdown)
├── layouts/          # レイアウト
├── pages/            # ページ
├── styles/           # スタイル
├── utils/            # ユーティリティ
├── config.ts         # サイト設定
├── constants.ts      # 定数
└── content.config.ts # コンテンツ設定

public/
├── assets/           # 静的アセット
├── favicon.svg       # ファビコン
└── toggle-theme.js   # テーマ切替スクリプト
```

## コマンド

```bash
pnpm install          # 依存関係インストール
pnpm dev              # 開発サーバー起動 (localhost:4321)
pnpm build            # 本番ビルド（astro check + build + pagefind）
pnpm preview          # ビルド結果のプレビュー
pnpm format           # コードフォーマット
pnpm lint             # ESLint実行
```

## 開発ガイドライン

### ブログ記事のフロントマター

```yaml
---
author: "著者名"
pubDatetime: 2026-01-01T00:00:00+09:00
modDatetime: 2026-01-02T00:00:00+09:00  # 任意
title: "記事タイトル"
slug: article-slug                       # 任意（自動生成可）
featured: false
draft: false
tags:
  - tag1
  - tag2
description: "記事の説明"
ogImage: ""                              # 任意
---
```

### 記事の配置

ブログ記事は `src/data/blog/` ディレクトリに配置。
サブディレクトリでの整理も可能（v5.1.0+）。

### コーディング規約

- TypeScript を使用
- コンポーネントは `.astro` 形式を基本とする
- Tailwind CSS のユーティリティクラスを活用
- アクセシビリティ（a11y）を考慮

## 機能

### 実装済み
- [x] タグ機能（記事の分類・フィルタリング）
- [x] 記事検索（Pagefindによるファジー検索）
- [x] OGP画像自動生成（satori + sharp）
- [x] ダーク/ライトモード切替
- [x] レスポンシブ対応
- [x] RSSフィード
- [x] サイトマップ

### スコープ外
- コメント機能
- アナリティクス
- 多言語対応（日本語のみ）

## 設定ファイル

### `src/config.ts`
サイトの基本設定（タイトル、説明、著者、言語など）

### `astro.config.ts`
Astroの設定（site, base, マークダウン設定など）

## 参考リンク

- [AstroPaper公式](https://astro-paper.pages.dev/)
- [AstroPaper GitHub](https://github.com/satnaing/astro-paper)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
