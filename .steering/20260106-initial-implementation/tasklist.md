# 実装タスクリスト - Initial Implementation

## Phase 1: プロジェクトセットアップ

- [ ] Astroプロジェクト初期化 (`pnpm create astro@latest`)
- [ ] Tailwind CSS導入・設定
- [ ] TypeScript設定
- [ ] ディレクトリ構造作成
- [ ] EditorConfig / Prettier / ESLint設定
- [ ] Git初期化・.gitignore設定

---

## Phase 2: 基盤実装

### レイアウト

- [ ] `BaseLayout.astro` 作成
- [ ] `<head>` コンポーネント（SEO/OGP対応）
- [ ] `Header` コンポーネント
- [ ] `Footer` コンポーネント
- [ ] `Navigation` コンポーネント

### テーマ切替

- [ ] ダーク/ライトモード切替ロジック実装
- [ ] `ThemeToggle` コンポーネント作成
- [ ] Tailwind dark mode設定
- [ ] フラッシュ防止スクリプト

### 多言語対応

- [ ] i18nユーティリティ作成
- [ ] 翻訳ファイル作成 (ja.json, en.json)
- [ ] `LanguageSwitcher` コンポーネント
- [ ] ルートリダイレクト設定

---

## Phase 3: ブログ機能

### Content Collection

- [ ] Blog用Content Collection定義
- [ ] サンプル記事作成（日英各1件）

### 記事一覧

- [ ] 記事一覧ページ (`/ja/blog/`, `/en/blog/`)
- [ ] `BlogCard` コンポーネント
- [ ] ページネーション（必要に応じて）

### 記事詳細

- [ ] 記事詳細ページ (`/ja/blog/[slug]`)
- [ ] `BlogLayout.astro` 作成
- [ ] 目次（ToC）コンポーネント（任意）
- [ ] 前後記事ナビゲーション

### タグ機能

- [ ] タグ一覧ページ (`/ja/tags/`)
- [ ] タグ別記事一覧 (`/ja/tags/[tag]`)
- [ ] `TagList` コンポーネント

### シリーズ機能

- [ ] シリーズ一覧ページ
- [ ] `SeriesNav` コンポーネント
- [ ] シリーズ内ナビゲーション

### 検索機能

- [ ] 検索ロジック実装（クライアントサイド）
- [ ] `SearchBox` コンポーネント
- [ ] 検索結果表示

---

## Phase 4: ポートフォリオ機能

### Content Collection

- [ ] Project用Content Collection定義
- [ ] サンプルプロジェクト作成

### プロジェクト一覧

- [ ] プロジェクト一覧ページ (`/ja/projects/`)
- [ ] `ProjectCard` コンポーネント

### プロジェクト詳細

- [ ] プロジェクト詳細ページ（任意）

### スキル一覧

- [ ] スキルページ (`/ja/skills/`)
- [ ] `SkillBadge` コンポーネント
- [ ] スキルデータ定義

### Aboutページ

- [ ] Aboutページ (`/ja/about/`)
- [ ] プロフィールセクション
- [ ] SNSリンク

---

## Phase 5: OGP・SEO

### OGP画像生成

- [ ] satori + sharp 導入
- [ ] OGP画像テンプレート作成
- [ ] `/og/[slug].png` エンドポイント実装
- [ ] 記事メタデータにOGP画像パス設定

### SEO

- [ ] サイトマップ生成設定
- [ ] robots.txt 設定
- [ ] 構造化データ（JSON-LD）

---

## Phase 6: スタイリング

- [ ] グローバルスタイル設定
- [ ] タイポグラフィ調整
- [ ] レスポンシブ対応確認
- [ ] ダークモード全体確認
- [ ] アクセシビリティチェック

---

## Phase 7: デプロイ

- [ ] GitHub Actions ワークフロー作成
- [ ] GitHub Pages設定
- [ ] 本番デプロイ確認
- [ ] カスタムドメイン設定（任意）

---

## Phase 8: 仕上げ

- [ ] Lighthouse監査・改善
- [ ] クロスブラウザテスト
- [ ] READMEの整備
- [ ] 初期コンテンツ作成

---

## 優先度について

1. **Phase 1-2**: 基盤。最初に完了必須
2. **Phase 3**: ブログがメインなので優先度高
3. **Phase 4-5**: ポートフォリオとOGP
4. **Phase 6-7**: スタイル調整とデプロイ
5. **Phase 8**: 公開前の仕上げ
