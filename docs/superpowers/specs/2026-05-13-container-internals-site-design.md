# コンテナ学習教材サイト設計

## 概要

Linux コンテナの仕組みを学ぶ日本語教材を、VitePress 標準テーマ中心で構築する。今回のスコープは本文執筆ではなく、後から教材本文を流し込みやすいサイト骨組みの整備に限定する。

## 目的

- GitBook 的に章ごとに読める教材構成を用意する
- 初学者向け教材に必要な導線を、VitePress の標準機能で整理する
- 本文執筆時に迷わないよう、ページ構成と共通表現を先に固定する

## 採用方針

### 1. サイト構成

- VitePress は `docs/` 配下に配置する
- サイト入口は `docs/index.md`
- 教材トップは `docs/container-internals/index.md`
- 本編は章ごとの複数ページ構成にする
- 演習、解答、ミニプロジェクト、次の学習資料は本編から分離する

### 2. UI 方針

- VitePress 標準テーマを使う
- 独自テーマ拡張は行わない
- GitBook 風 UI は、サイドバー、章内 TOC、前後ナビ、検索で代替する

### 3. 表現方針

- 図解は Mermaid を使う
- 注意事項は `warning` / `danger` コンテナを使う
- 要点は短い箇条書きまたは `tip` コンテナで整理する
- 実験パートは統一見出しで書けるようにする

## ディレクトリ設計

```text
docs/
  index.md
  container-internals/
    index.md
    01-overview.md
    02-process-and-proc.md
    03-syscall-and-kernel.md
    04-namespace.md
    05-mount-rootfs-chroot-pivot-root.md
    06-cgroup-v2.md
    07-capability.md
    08-seccomp.md
    09-oci-runtime.md
    10-summary.md
    questions.md
    answers.md
    mini-project.md
    next-steps.md
  .vitepress/
    config.mts
package.json
README.md
```

## ページ責務

### 入口

- `docs/index.md`
  - サイトの入口
  - 教材一覧と導線

### 教材トップ

- `docs/container-internals/index.md`
  - 教材のゴール
  - 想定読者
  - 読み方
  - 前提環境
  - 章一覧

### 本編

- `01-overview.md`
  - 全体像
- `02-process-and-proc.md`
  - process と `/proc`
- `03-syscall-and-kernel.md`
  - syscall と user space / kernel space
- `04-namespace.md`
  - namespace
- `05-mount-rootfs-chroot-pivot-root.md`
  - mount / rootfs / chroot / pivot_root
- `06-cgroup-v2.md`
  - cgroup / cgroup v2
- `07-capability.md`
  - capability
- `08-seccomp.md`
  - seccomp
- `09-oci-runtime.md`
  - OCI runtime / runc / youki
- `10-summary.md`
  - 全体まとめ表

### 補助ページ

- `questions.md`
  - 確認問題
- `answers.md`
  - 解答と解説
- `mini-project.md`
  - Docker を使わずにコンテナっぽい環境を作るハンズオン
- `next-steps.md`
  - 次に読む資料
  - `runc` / `youki` の読むと良い箇所

## VitePress 設定

### 採用する機能

- ナビゲーション
- サイドバー
- ローカル検索
- 章内アウトライン
- 前後ナビ
- Mermaid

### 採用しないもの

- 独自テーマ
- 大きな CSS カスタム
- 画像アセット前提の UI

## Markdown 記述ルール

本文執筆時に揃えるため、以下を前提にする。

### 実験パート

```md
## 実験名
### 目的
### 実行コマンド
### 期待される出力の例
### 出力の読み方
### 何が理解できるか
### 注意点
```

### 注意書き

- 危険性のある操作: `danger`
- 環境依存の補足: `warning`
- 学習上の要点: `tip`

### 図解

- Mermaid を使う
- 静的画像は必須にしない

## 実装スコープ

### 今回やること

- VitePress の最小実行環境を作る
- 教材全体のページ骨組みを作る
- サイドバーとナビゲーションを接続する
- 後から本文を入れやすいプレースホルダを置く

### 今回やらないこと

- 教材本文の本格執筆
- 独自テーマの構築
- 大規模な見た目調整
- 実画像や外部アセットの作成

## 完了条件

- `npm run docs:dev` でローカル起動できる
- 入口、教材トップ、各章、補助ページがリンクされる
- サイドバーで章移動できる
- Mermaid を後から本文で使える
- 本文が未記入でも、教材サイトとして骨組みが崩れない
