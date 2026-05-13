# Container Internals Content Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Linux コンテナ教材サイトの全ページに、初学者向けで技術的に正確な本文を実装する

**Architecture:** 既存の章ページごとに本文を埋め、Mermaid 図、Ubuntu 実験、章末まとめを追加する。問題ページと解答ページは分離し、ミニプロジェクトと次資料ページまで教材一式を完成させる。

**Tech Stack:** VitePress, Markdown, Mermaid

---

## Chunk 1: 本編前半

### Task 1: 第1章から第3章を埋める

**Files:**
- Modify: `docs/container-internals/01-overview.md`
- Modify: `docs/container-internals/02-process-and-proc.md`
- Modify: `docs/container-internals/03-syscall-and-kernel.md`

- [ ] 章の導入、基本概念、Docker との関係、図、実験、誤解、章末まとめを書く
- [ ] build で Markdown / Mermaid 構文エラーがないことを確認する

## Chunk 2: 本編中盤

### Task 2: 第4章から第6章を埋める

**Files:**
- Modify: `docs/container-internals/04-namespace.md`
- Modify: `docs/container-internals/05-mount-rootfs-chroot-pivot-root.md`
- Modify: `docs/container-internals/06-cgroup-v2.md`

- [ ] 重点章として、図解と実験を厚めに入れる
- [ ] namespace / cgroup / rootfs の違いが見分けられる構成にする

## Chunk 3: 本編後半

### Task 3: 第7章から第10章を埋める

**Files:**
- Modify: `docs/container-internals/07-capability.md`
- Modify: `docs/container-internals/08-seccomp.md`
- Modify: `docs/container-internals/09-oci-runtime.md`
- Modify: `docs/container-internals/10-summary.md`

- [ ] capability と seccomp を対比的に説明する
- [ ] OCI runtime の起動フローを統合的に説明する
- [ ] 第10章に比較表を入れる

## Chunk 4: 演習と補助資料

### Task 4: 問題、解答、ミニプロジェクト、次資料を書く

**Files:**
- Modify: `docs/container-internals/questions.md`
- Modify: `docs/container-internals/answers.md`
- Modify: `docs/container-internals/mini-project.md`
- Modify: `docs/container-internals/next-steps.md`

- [ ] 指定数の問題を追加する
- [ ] 各問題に解答例と解説を付ける
- [ ] 安全なハンズオンを設計する
- [ ] `runc` / `youki` を読む導線を追加する

## Chunk 5: 検証

### Task 5: 全体 build を確認する

**Files:**
- Verify: `docs/container-internals/*.md`

- [ ] `npm run docs:build` を実行する
- [ ] エラーがあれば修正する

## Unresolved Questions

- なし
