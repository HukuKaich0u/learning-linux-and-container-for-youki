---
title: 用語ガイド
outline: [2, 3]
prev:
  text: 教材トップ
  link: /container-internals/
next:
  text: "第1章: コンテナの正体を先に掴む"
  link: /container-internals/01-overview
---

# 用語ガイド

このページは、本文を読み進める中で出てくる単語を、その都度確認できるようにまとめたものです。  
初学者向けに、長い厳密定義ではなく「まず読めるようになる説明」を優先しています。

::: tip 読み方
基本は本文を読み進めながら、分からない単語が出たときにこのページへ戻って確認してください。  
Linux にまだほとんど触れていない場合は、最初にざっと目を通してから本文に入っても構いません。
:::

## Linux 関連の基本語

### Linux

OS カーネルと、その周辺で使われる仕組みを含む文脈で使われることが多い言葉です。  
この教材では主に「Linux カーネルが提供する機能」を学びます。

### kernel

OS の中心部分です。  
process 管理、メモリ管理、ファイルシステム、ネットワークなどを担当します。

### user space

アプリケーションが動く側の世界です。  
`bash`, `python`, `docker`, `runc` などはこちらで動きます。

### kernel space

Linux カーネルが動く側の世界です。  
安全性のため、普通のアプリはここを直接いじれません。

## process 周辺

### program

ディスク上にある実行ファイルやコードです。

### process

実行中の program です。  
Linux では多くのものが process として動きます。コンテナの正体も最終的には process です。

### PID

Process ID の略です。  
各 process に付く識別番号です。

### PPID

Parent Process ID の略です。  
その process を作った親 process の PID です。

### PID 1

ある PID 空間の中で最初の process に見える番号です。  
コンテナの中ではアプリ自身が PID 1 に見えることがあります。

## syscall 周辺

### syscall

system call の略です。  
user space の process が kernel に機能を依頼する正式な入口です。

### `execve`

現在の process を別プログラムへ切り替える syscall です。

### `clone`

新しい process や thread を作るのに使われる syscall です。  
namespace 生成とも関係します。

## ファイルシステム周辺

### filesystem

ファイルやディレクトリを保存・管理する仕組みです。

### mount

filesystem やディレクトリを、あるパスに接続して見えるようにすることです。

### root

filesystem の根、つまり `/` のことです。  
ただし「root ユーザー」とは別の意味なので注意してください。

### rootfs

process に見せる `/` の中身一式です。  
コンテナではイメージから用意されたファイル群が rootfs になります。

### bind mount

既存のディレクトリを、別の場所にも見せる mount の方法です。

### `chroot`

process から見た root directory を切り替える仕組みです。

### `pivot_root`

現在の rootfs を新しい rootfs に本格的に切り替える仕組みです。  
コンテナ runtime で重要です。

## namespace / cgroup 周辺

### namespace

process から見える世界を分ける仕組みです。

### PID namespace

見える process 一覧と PID 番号の見え方を分けます。

### mount namespace

見える mount 構成を分けます。

### network namespace

見える NIC、IP、routing などのネットワーク世界を分けます。

### UTS namespace

hostname などの見え方を分けます。

### cgroup

process 群に対して、CPU、memory、pids などの資源制御を行う仕組みです。

### cgroup v2

現代 Linux で重要な cgroup の新しい統一階層版です。

## security 周辺

### root ユーザー

Linux の強い管理者権限を持つユーザーです。  
ただしコンテナでは、見かけ上 root でも制限されていることがあります。

### capability

root 権限を細かい能力に分割した仕組みです。

### seccomp

使える syscall を制限する仕組みです。

### seccomp profile

どの syscall を許可・拒否するかを表したルール集合です。

## 観察用ファイルシステム

### procfs

`/proc` のことです。  
process やカーネル状態を見せる仮想ファイルシステムです。

### sysfs

`/sys` のことです。  
主にデバイスやカーネルサブシステム情報を見せる仮想ファイルシステムです。  
なお `/sys/fs/cgroup` は名前こそ `/sys` 配下ですが、通常は `cgroup2` filesystem の mount point です。

## コンテナ実装周辺

### Docker

container 技術を扱いやすくする代表的な利用者向けツール群です。  
container 技術そのものと同義ではありません。

### `dockerd`

Docker の daemon です。  
利用者からの要求を受けて、下のレイヤーへ処理を渡します。

### `containerd`

container を管理する中間レイヤーです。  
Docker や Kubernetes 文脈でよく登場します。

### container image

コンテナの rootfs を作る元になるファイルレイヤー群です。

### OCI

Open Container Initiative の略です。  
コンテナイメージ形式や runtime の標準仕様を定める取り組みです。

### OCI runtime

Linux 機能を組み合わせて、実際にコンテナ process を起動する実行役です。

### `runc`

OCI runtime の有名な実装です。

### `youki`

Rust で書かれた OCI runtime 実装です。

### `CRI`

Container Runtime Interface の略です。  
Kubernetes が runtime 管理レイヤーを呼ぶためのインターフェースです。

### `CRI-O`

Kubernetes 文脈で使われる container 管理レイヤー実装の 1 つです。

### OCI bundle

runtime が読む入力ディレクトリです。  
典型的には `config.json` と `rootfs/` を含みます。

### `config.json`

どの process を、どんな namespace、cgroup、mount、capability、seccomp 設定で起動するかを書く OCI 設定ファイルです。

## 周辺用語

### container

Linux の複数機能で隔離された process、またはその process 群のことです。

### VM

Virtual Machine の略です。  
一般に別の OS カーネルを起動する仮想マシンです。

### pod

Kubernetes で、1 つ以上のコンテナをまとめて扱う単位です。  
この教材の主題は container ですが、将来 Kubernetes に進むと `pod` という単語が頻出します。

::: warning 用語の注意
`container` と `pod` は同じ意味ではありません。  
`pod` は Kubernetes の管理単位、`container` は Linux 機能で隔離された process の単位です。
:::

## このページで理解すべきこと

- 本文に出る主要単語の最低限の意味
- `PID`, `root`, `rootfs`, `namespace`, `cgroup`, `capability`, `seccomp` の違い
- `container`, `Docker`, `OCI runtime`, `CRI`, `VM`, `pod` を混同しないこと
