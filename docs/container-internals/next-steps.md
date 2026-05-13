---
title: 次に読む資料
outline: [2, 3]
prev:
  text: "ミニプロジェクト"
  link: /container-internals/mini-project
next: false
---

# 次に読む資料

この教材を終えたら、次は「概念をコードや仕様に結び付ける」段階です。

## まず読むとよい資料

### 1. `man` ページ

Linux の仕組みを理解する最短経路の 1 つです。

おすすめ:

- `man 2 clone`
- `man 2 mount`
- `man 2 execve`
- `man 7 namespaces`
- `man 7 cgroups`
- `man 7 capabilities`
- `man 2 seccomp`
- `man 2 pivot_root`
- `man 2 chroot`

読むコツ:

- 最初から全文を理解しようとしない
- `NAME`, `DESCRIPTION`, `EXAMPLE` を拾う
- 教材で出た単語が、仕様レベルでどう書かれているかを見る

### 2. OCI runtime spec

概念がどのように標準化されているかを見るのに有効です。

特に注目点:

- `config.json` の `process`
- `mounts`
- `linux.namespaces`
- `linux.resources`
- `capabilities`
- `seccomp`

読む目的:

- 第9章で見た「runtime が何を設定するか」を、仕様として確認する

### 3. Docker / containerd のドキュメント

高レイヤーと低レイヤーの橋渡しになります。

読むポイント:

- Docker オプションが Linux 機能とどうつながるか
- containerd が runtime をどう呼び出すか

## `runc` を読むならどこから始めるか

`runc` を読むときは、最初から全体を追い切ろうとしないほうがよいです。

おすすめの見方:

1. `create` / `run` 系の入口を見る
2. `config.json` をどう読み込んでいるかを見る
3. namespace / mount / rootfs / capability / seccomp 設定に対応する箇所を探す

読みながら、次の問いを持つと理解しやすいです。

- どこで namespace を作るのか
- どこで mount を組むのか
- `pivot_root` はどこで行うのか
- seccomp はどこで有効になるのか
- 最後にどこで `exec` するのか

## `youki` を読むならどこから始めるか

`youki` は Rust 製なので、型や構造体をたどりやすい面があります。

読む順序の例:

1. CLI の入口
2. OCI 設定の読み込み
3. namespace / cgroup / mount 設定の処理
4. process 起動箇所

見るべき観点は `runc` とほぼ同じです。

## どの部分を読むと理解が深まるか

この教材の内容と対応付けると、特に次の部分が重要です。

### process / syscall

- 実際に process を spawn し `exec` する箇所
- 低レベル Linux API 呼び出し

### namespace

- namespace 設定用の構造や syscall 呼び出し

### rootfs / mount / pivot_root

- rootfs 準備
- mount 一覧の適用
- old root の切替処理

### cgroup

- OCI resources を cgroup 設定へ変換する箇所

### capability / seccomp

- capability セット計算
- seccomp profile 適用処理

## 次の実践テーマ

この教材の次におすすめの学習テーマです。

### 1. Docker コンテナをホストから観察する

やること:

- `docker inspect`
- `/proc/<pid>/ns/*`
- `/proc/<pid>/cgroup`
- `/proc/<pid>/status`

目的:

- 教材の概念を実際のコンテナへ対応付ける

### 2. rootless container を調べる

テーマ:

- user namespace
- ID mapping
- root に見えてもホスト root でない仕組み

### 3. Kubernetes に進む前に containerd を少し見る

Kubernetes はさらに抽象度が高いので、その前に:

- containerd
- OCI runtime
- Linux 機能

のつながりを固めると理解しやすくなります。

### 4. 実験環境で seccomp / capability を変えてみる

たとえば:

- `--cap-drop=ALL`
- `--cap-add=NET_ADMIN`
- `--security-opt seccomp=unconfined`

などを比較し、`/proc/self/status` の差を観察します。

## 学習ステップのおすすめ順

1. この教材をもう一度ざっと読み返す
2. ミニプロジェクトを手で再実行する
3. Docker コンテナをホストから観察する
4. OCI runtime spec を読む
5. `runc` か `youki` の実装を追う

## 最後の到達目標

次の説明を自分の言葉でできれば、この教材の目的は達成です。

- コンテナは Linux の機能で隔離された process である
- Docker はその仕組みを使いやすく包んでいる
- `runc` や `youki` は、その低レイヤー実装として Linux 機能を実際に組み合わせている
