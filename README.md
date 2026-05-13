# Linux コンテナ学習教材

このリポジトリは、コンテナやコンテナランタイムに興味がある人向けに、Linux の基本概念を解説する学習教材です。

Docker を触ったことはあるが中身はまだ曖昧、`runc` や `youki` が何をしているのか知りたい、という人が、コンテナの土台になっている Linux の仕組みを順番に理解できるように構成しています。

## この教材で目指すこと

この教材は、Linux の基礎を広く網羅するというより、コンテナランタイムの仕組みを理解するために必要な範囲へ絞って解説しています。

読み終えると、少なくとも次のようなことを説明できる状態を目指します。

- コンテナは VM ではなく、Linux の機能で隔離されたプロセスであること
- `namespace` が見える世界を分ける仕組みであること
- `cgroup` が使える資源を制限・計測する仕組みであること
- `rootfs`、`mount`、`chroot`、`pivot_root` がファイルシステムの見え方にどう関わるか
- `capability` と `seccomp` が権限やシステムコールの制御にどう使われるか
- OCI runtime や `runc` / `youki` が Linux の機能をどう組み合わせてコンテナを起動するか

## リポジトリ構成

このリポジトリは VitePress で構築した学習教材サイトです。

- 入口ページ: `docs/index.md`
- 本編: `docs/container-internals/`
- VitePress 設定: `docs/.vitepress/`

README だけで完結するというより、ローカルでサイトを起動して順番に読んでいく前提の構成です。

## ローカルで読む

依存関係をインストールして、VitePress の開発サーバーを起動してください。

```bash
npm install
npm run docs:dev
```

ビルド確認をしたい場合は次も使えます。

```bash
npm run docs:build
```

## 教材の章構成

本編は `docs/container-internals/` 以下にあります。内容はおおむね次の順番です。

- 用語ガイド
- 第1章: コンテナの正体を先に掴む
- 第2章: process と `/proc`
- 第3章: syscall と user space / kernel space
- 第4章: `namespace`
- 第5章: `mount` / `rootfs` / `chroot` / `pivot_root`
- 第6章: `cgroup` / cgroup v2
- 第7章: `capability`
- 第8章: `seccomp`
- 第9章: OCI runtime / `runc` / `youki`
- 第10章: 全体まとめ
- 確認問題
- 解答と解説
- ミニプロジェクト
- 次に読む資料

## 想定している読み方

おすすめは次の流れです。

1. まず用語ガイドで単語の土台を作る
2. 第1章で全体像を掴む
3. 第2章から第9章で個々の仕組みを理解する
4. 第10章で Docker や OCI runtime との対応関係を整理する
5. 確認問題やミニプロジェクトで理解を固める

Linux の基礎をゼロから網羅する教材ではありませんが、コンテナランタイムの仕組みを追うために必要な Linux の基本概念は、この教材で一通り把握できるようにしてあります。
