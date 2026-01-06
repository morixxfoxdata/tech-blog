# 実装タスクリスト - Initial Implementation

## Phase 1: プロジェクトセットアップ

- [x] Astroプロジェクト初期化 (`pnpm create astro@latest`)
- [x] Tailwind CSS導入・設定
- [x] TypeScript設定
- [x] ディレクトリ構造作成
- [x] EditorConfig / Prettier / ESLint設定
- [x] Git初期化・.gitignore設定

---

## Phase 2: 基盤実装

### レイアウト

- [x] `BaseLayout.astro` 作成
- [x] `<head>` コンポーネント（SEO/OGP対応）
- [x] `Header` コンポーネント
- [x] `Footer` コンポーネント
- [x] `Navigation` コンポーネント

### テーマ切替

- [x] ダーク/ライトモード切替ロジック実装
- [x] `ThemeToggle` コンポーネント作成
- [x] Tailwind dark mode設定
- [x] フラッシュ防止スクリプト

### 多言語対応

- [x] i18nユーティリティ作成
- [x] 翻訳ファイル作成 (ja.json, en.json)
- [x] `LanguageSwitcher` コンポーネント
- [x] ルートリダイレクト設定

---

## Phase 3: ブログ機能

### Content Collection

- [x] Blog用Content Collection定義
- [x] サンプル記事作成（日英各1件）

### 記事一覧

- [x] 記事一覧ページ (`/ja/blog/`, `/en/blog/`)
- [x] `BlogCard` コンポーネント
- [ ] ページネーション（必要に応じて）

### 記事詳細

- [x] 記事詳細ページ (`/ja/blog/[slug]`)
- [x] `BlogLayout.astro` 作成
- [ ] 目次（ToC）コンポーネント（任意）
- [ ] 前後記事ナビゲーション

### タグ機能

- [x] タグ一覧ページ (`/ja/tags/`)
- [x] タグ別記事一覧 (`/ja/tags/[tag]`)
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

- [x] Project用Content Collection定義
- [ ] サンプルプロジェクト作成

### プロジェクト一覧

- [x] プロジェクト一覧ページ (`/ja/projects/`)
- [ ] `ProjectCard` コンポーネント

### プロジェクト詳細

- [ ] プロジェクト詳細ページ（任意）

### スキル一覧

- [ ] スキルページ (`/ja/skills/`)
- [ ] `SkillBadge` コンポーネント
- [ ] スキルデータ定義

### Aboutページ

- [x] Aboutページ (`/ja/about/`)
- [x] プロフィールセクション
- [x] SNSリンク

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

- [x] グローバルスタイル設定
- [ ] タイポグラフィ調整
- [ ] レスポンシブ対応確認
- [ ] ダークモード全体確認
- [ ] アクセシビリティチェック

---

## Phase 7: デプロイ

- [x] GitHub Actions ワークフロー作成
- [x] GitHub Pages設定
- [x] 本番デプロイ確認
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
