# Container Internals Site Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** VitePress 標準テーマで、Linux コンテナ学習教材の章立てサイト骨組みを実装する

**Architecture:** `docs/` 配下に VitePress サイトを作り、`container-internals/` に教材本編と補助ページを分割配置する。テーマ拡張は行わず、`config.mts` の nav / sidebar / search / outline / Mermaid で教材導線を構成する。

**Tech Stack:** Node.js, npm, VitePress, Markdown, Mermaid

---

## Chunk 1: Tooling And Docs Bootstrap

### Task 1: Node/VitePress 実行基盤を作る

**Files:**
- Create: `package.json`
- Create: `README.md`

- [ ] **Step 1: 依存定義の方針を確認する**

確認:
- `vitepress` を `devDependencies` に追加する
- スクリプトは `docs:dev`, `docs:build`, `docs:preview` の 3 つに絞る

- [ ] **Step 2: `package.json` を追加する**

内容:

```json
{
  "name": "learning",
  "private": true,
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.0"
  }
}
```

- [ ] **Step 3: `README.md` を追加する**

内容:

```md
# learning

## Setup

```bash
npm install
```

## Run

```bash
npm run docs:dev
```

## Build

```bash
npm run docs:build
```
```

- [ ] **Step 4: 変更を確認する**

Run: `git diff -- package.json README.md`
Expected: VitePress 実行基盤だけが追加されている

- [ ] **Step 5: コミットする**

```bash
git add package.json README.md
git commit -m "build: add vitepress tooling"
```

## Chunk 2: VitePress Core Config

### Task 2: サイト設定と教材導線を作る

**Files:**
- Create: `docs/.vitepress/config.mts`

- [ ] **Step 1: 設定項目を固定する**

要件:
- site title / description
- nav
- sidebar
- search
- outline
- social/link は入れない
- Mermaid を有効化

- [ ] **Step 2: `config.mts` を追加する**

内容の骨子:

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Linux Container Learning",
  description: "Linux とコンテナの仕組みを学ぶ教材",
  srcDir: "docs",
  lang: "ja-JP",
  markdown: {
    config(md) {
      md.use(require("mermaid-markdown-it"));
    }
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "教材トップ", link: "/container-internals/" }
    ],
    search: {
      provider: "local"
    },
    outline: {
      level: [2, 3],
      label: "このページの内容"
    },
    sidebar: {
      "/container-internals/": [
        {
          text: "はじめに",
          items: [
            { text: "教材トップ", link: "/container-internals/" }
          ]
        },
        {
          text: "本編",
          items: [
            { text: "第1章", link: "/container-internals/01-overview" }
          ]
        }
      ]
    }
  }
});
```

実装時補足:
- Mermaid の有効化方法は、VitePress 1 系で壊れない構成を選ぶ
- 依存追加が必要なら `package.json` に反映する
- サイドバーは全章と補助ページまで埋める

- [ ] **Step 3: 最低限の型/構文を確認する**

Run: `sed -n '1,220p' docs/.vitepress/config.mts`
Expected: `defineConfig` で export され、リンクが全ページ分ある

- [ ] **Step 4: コミットする**

```bash
git add docs/.vitepress/config.mts package.json
git commit -m "docs: configure vitepress site navigation"
```

## Chunk 3: Entry Pages

### Task 3: サイト入口と教材トップを作る

**Files:**
- Create: `docs/index.md`
- Create: `docs/container-internals/index.md`

- [ ] **Step 1: `docs/index.md` を追加する**

内容:
- サイトタイトル
- 教材へのリンク
- 今回の教材が Linux コンテナ入門である説明

最低形:

```md
# 学習サイト

- [Linux コンテナの仕組み](/container-internals/)
```

- [ ] **Step 2: `docs/container-internals/index.md` を追加する**

内容:
- 教材タイトル
- 想定読者
- ゴール
- 前提環境
- 読み方
- 章一覧

- [ ] **Step 3: frontmatter を整える**

方針:
- `title`
- `outline`
- `prev: false`
- 必要なら `next`

- [ ] **Step 4: 変更を確認する**

Run: `sed -n '1,220p' docs/index.md docs/container-internals/index.md`
Expected: 入口と教材トップの導線が揃っている

- [ ] **Step 5: コミットする**

```bash
git add docs/index.md docs/container-internals/index.md
git commit -m "docs: add landing pages for container course"
```

## Chunk 4: Chapter Skeletons

### Task 4: 本編 10 章のプレースホルダを作る

**Files:**
- Create: `docs/container-internals/01-overview.md`
- Create: `docs/container-internals/02-process-and-proc.md`
- Create: `docs/container-internals/03-syscall-and-kernel.md`
- Create: `docs/container-internals/04-namespace.md`
- Create: `docs/container-internals/05-mount-rootfs-chroot-pivot-root.md`
- Create: `docs/container-internals/06-cgroup-v2.md`
- Create: `docs/container-internals/07-capability.md`
- Create: `docs/container-internals/08-seccomp.md`
- Create: `docs/container-internals/09-oci-runtime.md`
- Create: `docs/container-internals/10-summary.md`

- [ ] **Step 1: 各章ファイルを作る**

各ファイル共通:
- frontmatter
- 章タイトル
- `::: warning 準備中` の短いプレースホルダ
- 将来入れる節見出しの骨だけ配置

- [ ] **Step 2: 前後ナビをつなぐ**

方針:
- 第1章は `prev: /container-internals/`
- 最終章は次に `questions.md`
- 中間章は前後リンクを順接続

- [ ] **Step 3: 第1章と第10章だけ少し厚めにする**

内容:
- 第1章: 全体像の見出し一覧
- 第10章: まとめ表を後で置く場所の見出し

- [ ] **Step 4: 変更を確認する**

Run: `find docs/container-internals -maxdepth 1 -type f | sort`
Expected: 本編 10 章が揃う

- [ ] **Step 5: コミットする**

```bash
git add docs/container-internals/0*.md docs/container-internals/10-summary.md
git commit -m "docs: add chapter skeleton pages"
```

## Chunk 5: Exercise Pages

### Task 5: 問題、解答、ミニプロジェクト、次の学習資料ページを作る

**Files:**
- Create: `docs/container-internals/questions.md`
- Create: `docs/container-internals/answers.md`
- Create: `docs/container-internals/mini-project.md`
- Create: `docs/container-internals/next-steps.md`

- [ ] **Step 1: 各補助ページを作る**

内容:
- `questions.md`: 選択問題 / 記述問題 / コマンド読解 / 総合問題の見出し
- `answers.md`: 解答例と解説の見出し
- `mini-project.md`: ハンズオンのゴール、前提、安全注意
- `next-steps.md`: 次に読む資料、`runc` / `youki` の読む場所の見出し

- [ ] **Step 2: 本編からの導線を閉じる**

方針:
- `10-summary.md` の次を `questions.md`
- `questions.md` の次を `answers.md`
- `answers.md` の次を `mini-project.md`
- `mini-project.md` の次を `next-steps.md`

- [ ] **Step 3: サイドバー項目と一致しているか確認する**

Run: `sed -n '1,260p' docs/.vitepress/config.mts`
Expected: 本編と補助ページがすべてサイドバーに載っている

- [ ] **Step 4: コミットする**

```bash
git add docs/container-internals/questions.md docs/container-internals/answers.md docs/container-internals/mini-project.md docs/container-internals/next-steps.md docs/.vitepress/config.mts
git commit -m "docs: add exercise and follow-up pages"
```

## Chunk 6: Verification

### Task 6: インストール、起動、ビルドを確認する

**Files:**
- Verify: `package.json`
- Verify: `docs/.vitepress/config.mts`
- Verify: `docs/**/*.md`

- [ ] **Step 1: 依存を入れる**

Run: `npm install`
Expected: `node_modules` と lockfile が生成される

- [ ] **Step 2: ビルド確認をする**

Run: `npm run docs:build`
Expected: build 成功、リンク切れや構文エラーが出ない

- [ ] **Step 3: ローカル確認をする**

Run: `npm run docs:dev`
Expected: ローカルサーバが立ち、トップと教材ページを開ける

- [ ] **Step 4: 目視確認する**

確認項目:
- Home から教材トップへ遷移できる
- サイドバーで全章へ移動できる
- Outline が表示される
- 前後ナビがつながる
- プレースホルダページでも崩れない

- [ ] **Step 5: 最終コミットを作る**

```bash
git add package-lock.json docs package.json README.md
git commit -m "feat: scaffold vitepress container learning site"
```

## Unresolved Questions

- なし
