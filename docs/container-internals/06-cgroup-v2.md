---
title: "第6章: cgroup / cgroup v2"
outline: [2, 3]
prev:
  text: "第5章: mount / rootfs / chroot / pivot_root"
  link: /container-internals/05-mount-rootfs-chroot-pivot-root
next:
  text: "第7章: capability"
  link: /container-internals/07-capability
---

# 第6章: cgroup / cgroup v2

namespace を理解すると「見える世界が分かれる」ことは分かります。  
しかし、それだけではまだ不十分です。

なぜなら、世界を分けても、ある process が CPU やメモリを無限に使ってしまえば、ホスト全体は苦しくなるからです。

そこで必要になるのが `cgroup` です。

::: tip この章の核心
cgroup = 使える資源を制限・計測する
:::

## なぜ cgroup が必要なのか

たとえば 1 台のサーバで:

- Web サーバ
- バッチ処理
- データベース
- 複数のコンテナ

を同時に動かしているとします。

このとき、どれか 1 つが暴走して:

- メモリを使い切る
- CPU を占有する
- process を大量生成する

と、他のアプリまで巻き添えになります。

namespace は「見え方」を分けますが、資源の上限は作りません。  
そこで cgroup により、process 群をまとめて制御します。

## cgroup とは何か

`cgroup` は control groups の略です。  
複数の process を 1 つのグループとして扱い、そのグループに対してリソース制限や使用量計測を行います。

ここで大事なのは「1 process ではなく process 群」が対象だということです。

コンテナは通常 1 個以上の process から成るので、cgroup と非常に相性がよいです。

## namespace との違い

ここは必ず区別してください。

| 仕組み | 役割 |
| --- | --- |
| namespace | 見える世界を分ける |
| cgroup | 使える資源を制限・計測する |

たとえば:

- PID namespace は「どの process が見えるか」
- cgroup pids controller は「何個まで process を作れるか」

で、対象は似て見えても役割が違います。

## cgroup で制限できる代表例

### CPU

CPU 使用時間の配分や上限を制御できます。

Docker では:

```bash
docker run --cpus=0.5 ...
```

のような指定が、cgroup に対応します。

### memory

メモリ使用量の上限を設定できます。

Docker では:

```bash
docker run --memory=256m ...
```

のような指定が対応します。

### pids

作成できる process 数の上限を設定できます。

Docker では:

```bash
docker run --pids-limit=100 ...
```

が対応します。

### io

ディスク I/O に関する重みや制御が可能です。  
初学者向けにはまず「CPU とメモリ以外も制御できる」と押さえれば十分です。

## cgroup v1 と v2 の違いをざっくり説明する

歴史的には cgroup には v1 と v2 があります。

### cgroup v1

- controller ごとにバラバラの階層になりがち
- CPU と memory で別ツリー、のような構成があり得る
- 柔軟だが分かりにくい面がある

### cgroup v2

- 統一階層
- 振る舞いが整理されている
- 現代 Linux ではこちらが重要

この教材では **cgroup v2 前提** で考えます。

## cgroup v2 のイメージ

```mermaid
flowchart TD
  A[/sys/fs/cgroup]
  B[app.slice]
  C[container A]
  D[container B]
  E[process群]
  F[process群]
  A --> B
  B --> C --> E
  B --> D --> F
```

各ディレクトリが cgroup を表し、その下に controller 用のファイルがあります。  
そこへ値を書いたり読んだりして、制限や計測を行います。

## `/sys/fs/cgroup` は何か

第2章で `/proc` を見ました。  
同じように、cgroup の観察窓口として重要なのが `/sys/fs/cgroup` です。

これは `sysfs` を通じて見える cgroup 関連のファイル群です。

ここで `sysfs` にも触れておきます。

- `/proc`: process やカーネル状態の観察窓口
- `/sys`: デバイス、カーネルサブシステム、cgroup などの観察窓口

つまり `procfs` と `sysfs` は、どちらも Linux 内部状態をファイルとして見せる仕組みですが、対象が少し違います。

## `cat /proc/self/cgroup` は何を示すか

```bash
cat /proc/self/cgroup
```

これは「今の process がどの cgroup に所属しているか」を示します。

cgroup v2 ではシンプルな出力になりやすく、たとえば:

```text
0::/user.slice/user-1000.slice/session-2.scope
```

のようになります。

## systemd と cgroup の関係

現代の多くの Linux では `systemd` が process 管理と cgroup 管理を強く結び付けています。

`systemd` は service や scope を cgroup として管理し:

- どの service がどれだけ CPU を使っているか
- どの service がどれだけメモリを使っているか

を把握・制御します。

そのため、Docker 以外でも cgroup は日常的に使われています。

## `systemd-cgls` と `systemd-cgtop`

### `systemd-cgls`

```bash
systemd-cgls
```

これは cgroup 階層を木構造で見せます。

### `systemd-cgtop`

```bash
systemd-cgtop
```

これは cgroup 単位で CPU やメモリ使用量を見せます。

コンテナだけでなく、Linux 全体で process 群をどう束ねているかが分かります。

## Docker オプションと cgroup の対応

Docker の代表的なオプションは、内部では cgroup 設定につながります。

| Docker オプション | cgroup での意味 |
| --- | --- |
| `--memory=256m` | メモリ上限 |
| `--cpus=0.5` | CPU 使用量の制御 |
| `--pids-limit=100` | 作成可能 process 数の上限 |

つまり Docker の「コンテナのリソース制限」は、Linux カーネルから見れば「その process 群の cgroup 設定」です。

## 実験: cgroup v2 が使われているか確認する

### 目的

現在の Ubuntu 環境が cgroup v2 を使っているか観察します。

### 実行コマンド

```bash
mount | grep cgroup
cat /proc/self/cgroup
ls /sys/fs/cgroup | head -n 20
```

### 期待される出力の例

```text
cgroup2 on /sys/fs/cgroup type cgroup2 (rw,nosuid,nodev,noexec,relatime)
0::/user.slice/user-1000.slice/session-2.scope
cgroup.controllers
cgroup.events
cgroup.freeze
cpu.max
memory.max
pids.max
```

### 出力の読み方

- `type cgroup2` なら cgroup v2 が有効
- `/proc/self/cgroup` で自分の所属先が分かる
- `/sys/fs/cgroup` に controller 用ファイルが見える

### 何が理解できるか

- cgroup は仮想概念ではなく、実際にファイルとして観察できる
- cgroup v2 は統一階層で管理されている

### 注意点

- 古い環境では v1 や hybrid 構成のことがあります

## 実験: `systemd-cgls` で process 群を見る

### 目的

Linux が process を cgroup 単位で束ねていることを観察します。

### 実行コマンド

```bash
systemd-cgls | head -n 40
```

### 期待される出力の例

```text
Control group /:
-.slice
├─user.slice
│ └─user-1000.slice
│   └─session-2.scope
│     ├─18452 bash
│     └─19001 systemd-cgls
└─system.slice
  ├─docker.service
  └─sshd.service
```

### 出力の読み方

- process が単独ではなく、group としてぶら下がっている
- service や session と cgroup が対応している

### 何が理解できるか

- cgroup はコンテナ専用ではない
- Linux 全体の process 管理基盤の一部である

### 注意点

- systemd を使っていない環境では使えません

## 実験: `systemd-run` で簡単な制限を試す

### 目的

process 群に対して資源制限を付ける感覚を体験します。

### 実行コマンド

```bash
systemd-run --user --scope -p MemoryMax=100M bash
```

新しく開いた shell で:

```bash
cat /proc/self/cgroup
```

さらに別例:

```bash
systemd-run --user --scope -p CPUQuota=50% bash
```

### 期待される出力の例

```text
Running scope as unit: run-r123456.scope
0::/user.slice/user-1000.slice/user@1000.service/app.slice/run-r123456.scope
```

### 出力の読み方

- 新しい scope として cgroup が作られている
- その shell と子 process が、制限付きの group に入る

### 何が理解できるか

- cgroup は process 群に対して適用される
- service や scope という単位で管理される感覚がつかめる

### 注意点

- 環境によって `systemd-run --user` が使えないことがあります
- WSL や最小 VM では systemd が有効でないことがあります

## 実験: Docker 制限と cgroup を結びつける

### 目的

Docker のリソース指定が cgroup に対応することを確認します。

### 実行コマンド

```bash
docker run --rm -d --name memdemo --memory=128m nginx
pid=$(docker inspect --format '{{.State.Pid}}' memdemo)
cat /proc/$pid/cgroup
docker rm -f memdemo
```

### 期待される出力の例

```text
0::/system.slice/docker-<container-id>.scope
```

### 出力の読み方

- コンテナ process が特定の cgroup に所属している
- その cgroup に対して memory 制限などが設定される

### 何が理解できるか

- Docker の `--memory` などはカーネルの cgroup 機能に接続している

### 注意点

- cgroup driver や rootless 設定でパスは異なることがあります

## よくある誤解

### 誤解1: cgroup はコンテナ専用機能である

違います。systemd や service 管理でも日常的に使われています。

### 誤解2: cgroup は process を見えなくする

違います。見え方は namespace、資源制御は cgroup です。

### 誤解3: cgroup v1 と v2 は名前が違うだけ

構造や運用感がかなり違います。現代 Linux では v2 を優先して理解するのが重要です。

## この章で理解すべきこと

- cgroup は process 群のリソースを制限・計測する仕組みである
- namespace は見える世界、cgroup は使える資源という役割分担である
- CPU、memory、pids、io などを制御できる
- cgroup v2 は統一階層で、現代 Linux で重要である
- `/sys/fs/cgroup` と `/proc/self/cgroup` が主要な観察窓口である
- systemd は cgroup を強く利用している
- Docker の `--memory`, `--cpus`, `--pids-limit` は cgroup に対応する
