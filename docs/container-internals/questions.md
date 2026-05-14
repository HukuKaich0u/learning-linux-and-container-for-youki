---
title: 確認問題
outline: [2, 3]
prev:
  text: "第10章: 全体まとめ"
  link: /container-internals/10-summary
next:
  text: "ミニプロジェクト"
  link: /container-internals/mini-project
---

# 確認問題

まずは自力で考え、必要になったら各問題の `解答を見る` を開いて確認してください。

## 選択問題

### 1. コンテナの正体として最も適切なのはどれですか

1. 別の物理マシン
2. 別の Linux カーネルを持つ仮想マシン
3. Linux の機能で隔離された process
4. Docker 専用の新しい実行単位

::: details 解答を見る
正解は 3 です。

コンテナは Linux の機能で隔離された process です。VM のように別のカーネルを持つわけではありません。
:::

### 2. `namespace` の役割として最も適切なのはどれですか

1. CPU 使用率を制限する
2. 見える世界を分ける
3. root 権限を細かく分ける
4. syscall を拒否する

::: details 解答を見る
正解は 2 です。

`namespace` は process ごとに見える世界を分けます。PID、mount、network、UTS などの見え方が変わります。
:::

### 3. `cgroup` の役割として最も適切なのはどれですか

1. 見える process 一覧を変える
2. 使える資源を制限・計測する
3. `/` の中身を差し替える
4. hostname を変える

::: details 解答を見る
正解は 2 です。

`cgroup` は process 群に対して CPU、memory、pids、io などのリソース制御を行います。
:::

### 4. `rootfs` の説明として正しいものはどれですか

1. Linux カーネル本体
2. process が見る `/` の中身
3. Docker daemon の設定ファイル
4. seccomp profile の保存場所

::: details 解答を見る
正解は 2 です。

`rootfs` は process が見る `/` の中身です。イメージから展開されたユーザーランドがここに入ります。
:::

### 5. `mount namespace` が主に分離するものはどれですか

1. process が見える mount 構成
2. CPU 利用率
3. capability の一覧
4. syscall テーブル

::: details 解答を見る
正解は 1 です。

`mount namespace` は、どの filesystem がどこに mount されて見えるかを分離します。
:::

### 6. `capability` の説明として最も適切なのはどれですか

1. root 権限を細かく分割したもの
2. process ID を管理する仕組み
3. メモリ上限を決める仕組み
4. network namespace の別名

::: details 解答を見る
正解は 1 です。

`capability` は root 権限を細かい能力に分割したものです。
:::

### 7. `seccomp` が制限する対象はどれですか

1. PID 番号
2. メモリ使用量
3. 使える syscall
4. 見える mount 一覧

::: details 解答を見る
正解は 3 です。

`seccomp` は syscall フィルタリングです。どの syscall を呼べるかを制限します。
:::

### 8. OCI runtime の役割として最も適切なのはどれですか

1. Linux カーネルを差し替える
2. Linux 機能を組み合わせてコンテナ process を起動する
3. Dockerfile をビルドするだけ
4. イメージ registry を提供する

::: details 解答を見る
正解は 2 です。

OCI runtime は Linux 機能を組み合わせて、実際のコンテナ process を起動します。
:::

### 9. `runc` と `youki` の関係として正しいものはどれですか

1. どちらも OCI runtime の実装
2. どちらも Linux ディストリビューション名
3. どちらも cgroup controller 名
4. どちらも network namespace の別名

::: details 解答を見る
正解は 1 です。

`runc` と `youki` は、どちらも OCI runtime の実装です。
:::

### 10. コンテナと VM の違いとして正しいものはどれですか

1. コンテナは必ず別カーネルを起動する
2. VM は namespace だけで作られる
3. コンテナはホストカーネルを共有する
4. VM では rootfs は不要である

::: details 解答を見る
正解は 3 です。

コンテナはホストの Linux カーネルを共有します。VM は一般にゲスト OS ごとのカーネルを持ちます。
:::

## 記述問題

### 1.

Linux における process とは何かを、program との違いも含めて説明してください。

::: details 解答を見る
解答例:

Linux における process とは、実行中のプログラムです。program はディスク上の実行ファイルやコードそのものですが、process はそれがメモリに読み込まれ、PID を持ち、実行状態になった単位です。

解説:

program と process を分けることが、コンテナ理解の第一歩です。コンテナも最終的には process です。
:::

### 2.

コンテナが「VM ではなく隔離された process」であるとはどういう意味かを説明してください。

::: details 解答を見る
解答例:

コンテナは別カーネルを持つ VM ではなく、ホスト Linux カーネル上で動く process です。ただし、`namespace` で見える世界を分け、`cgroup` で資源を制限し、`rootfs` と mount で別の `/` を見せ、`capability` と `seccomp` で権限や syscall を絞ることで、独立した環境のように見せています。

解説:

この一文を自分の言葉で言えるようになることが、この教材の中心目標です。
:::

### 3.

namespace が「見える世界を分離する」とはどういう意味か、PID namespace を例に説明してください。

::: details 解答を見る
解答例:

`namespace` は process から見える世界を分離する仕組みです。PID namespace を例にすると、ホストには多数の process が存在していても、ある namespace 内の process からは一部だけが見え、その中での PID 番号も別に見えることがあります。

解説:

「存在そのものを消す」のではなく、「見え方を変える」と説明できるかが重要です。
:::

### 4.

cgroup と namespace の役割の違いを説明してください。

::: details 解答を見る
解答例:

`namespace` は process に見える世界を分離する仕組みであり、`cgroup` は process 群に使わせる資源を制限・計測する仕組みです。前者は visibility、後者は resource control の話です。

解説:

この区別は非常に重要です。混同するとコンテナの説明があいまいになります。
:::

### 5.

rootfs と mount namespace を組み合わせると、なぜコンテナごとに違う `/` を見せられるのか説明してください。

::: details 解答を見る
解答例:

`rootfs` は process に見せたい `/` の中身です。mount namespace を使うと、process ごとに別の mount 構成を見せられるため、その namespace の中で rootfs を `/` として見せることで、コンテナごとに異なる filesystem 世界を作れます。

解説:

「見せたい中身」と「見せる舞台」を分けて説明できると理解が深いです。
:::

### 6.

`chroot` と `pivot_root` の違いを説明してください。

::: details 解答を見る
解答例:

`chroot` は process から見た root directory を変える仕組みです。`pivot_root` は mount 構成の中で新しい rootfs を本格的に root に切り替え、古い root を退避させるための仕組みであり、コンテナ runtime でより本格的に使われます。

解説:

初学者向けには、「`chroot` は簡易的」「`pivot_root` は runtime 的」と整理すると分かりやすいです。
:::

### 7.

capability によって、なぜ「root だけど何でもできるわけではない」状態を作れるのか説明してください。

::: details 解答を見る
解答例:

`capability` は、従来 1 つに見えていた強い root 権限を細かい能力へ分割する仕組みです。そのため process ごとに必要な能力だけ残し、不要な能力を落とせます。これにより、コンテナ内で root に見えてもホスト root と同じ強さではない状態を作れます。

解説:

`uid=0` と capability 集合は別の層です。
:::

### 8.

seccomp と capability の違いを説明してください。

::: details 解答を見る
解答例:

`capability` は root 権限を細かい能力に分けて、何が許されるかを制御します。一方 `seccomp` は syscall フィルタであり、そもそもどの syscall を呼べるかを制御します。つまり capability は権限、seccomp は kernel 入口の制限です。

解説:

両方とも security ですが、層が違います。
:::

### 9.

OCI bundle に含まれる `config.json` と `rootfs` の役割を説明してください。

::: details 解答を見る
解答例:

OCI bundle は `config.json` と `rootfs` を中心とする runtime 入力です。`rootfs` はコンテナに見せる filesystem の中身であり、`config.json` はどの process を、どんな namespace、cgroup、mount、capability、seccomp 設定で起動するかを表します。

解説:

bundle を理解すると runtime の仕事がかなり具体的になります。
:::

### 10.

`docker run` の裏側で、どの Linux 機能がどの順で使われるかを説明してください。

::: details 解答を見る
解答例:

`docker run` の裏側では、まずイメージから `rootfs` を用意し、OCI runtime が `config.json` を読み、`namespace` を作り、`cgroup` を設定し、mount を組み、`capability` を調整し、`seccomp` profile を適用して、最後に `exec` でコンテナ内 process を起動します。

解説:

流れを順番で言えることが大切です。
:::

## コマンド読解問題

### 1.

次の出力を読み、何が分かるか説明してください。

```text
$ echo $$
18452

$ cat /proc/$$/status | grep -E 'Pid|PPid|Name'
Name:   bash
Pid:    18452
PPid:   17120
```

::: details 解答を見る
解答例:

現在の shell の PID は 18452、親 process の PID は 17120、process 名は `bash` だと分かります。つまり shell も 1 個の Linux process であり、親子関係を持っています。

解説:

`/proc/<pid>/status` は process 観察の基本です。
:::

### 2.

次の出力を読み、何が分かるか説明してください。

```text
$ readlink /proc/$$/ns/pid
pid:[4026531836]
```

::: details 解答を見る
解答例:

現在の shell は `pid:[4026531836]` という PID namespace に所属していることが分かります。同じ番号の process は同じ PID namespace に属しています。

解説:

`/proc/<pid>/ns/*` は namespace 観察に重要です。
:::

### 3.

次の出力を読み、何が分かるか説明してください。

```text
$ cat /proc/self/cgroup
0::/user.slice/user-1000.slice/session-2.scope
```

::: details 解答を見る
解答例:

現在の process は cgroup v2 の `/user.slice/user-1000.slice/session-2.scope` に所属していると分かります。つまり Linux はこの process を cgroup 階層の中で管理しています。

解説:

個々の process は cgroup の外で勝手に動いているわけではありません。
:::

### 4.

次の出力を読み、何が分かるか説明してください。

```text
$ cat /proc/$$/status | grep Cap
CapPrm: 00000000a80425fb
CapEff: 00000000a80425fb
```

::: details 解答を見る
解答例:

この process には `CapPrm` や `CapEff` として何らかの capability 集合が設定されていると分かります。capability は process ごとに保持され、root 権限が細かく分割されて表現されます。

解説:

数値をそのまま覚える必要はありませんが、「能力集合がある」と読めれば十分です。
:::

### 5.

次の出力を読み、何が分かるか説明してください。

```text
$ cat /proc/self/status | grep Seccomp
Seccomp:        2
Seccomp_filters: 1
```

::: details 解答を見る
解答例:

`Seccomp: 2` なので、この process には seccomp フィルタが有効になっていると分かります。つまり呼べる syscall が何らかのルールで制限されています。

解説:

seccomp は process 単位で観察できます。
:::

## Docker の裏側を説明する総合問題

### 1.

`docker run --rm -it ubuntu bash` を実行したとき、利用者から見える現象と、Linux カーネルの視点で起きていることを対応付けて説明してください。

::: details 解答を見る
解答例:

`docker run --rm -it ubuntu bash` を実行すると、利用者からは Ubuntu 環境の shell が開いたように見えます。しかし Linux カーネル視点では、別のカーネルを起動しているのではなく、OCI runtime が `rootfs` を用意し、`namespace` で見える世界を分け、`cgroup` で資源制御を設定し、mount で filesystem 世界を作り、`capability` と `seccomp` で権限と syscall を絞った上で、`bash` process を起動しています。

解説:

「見える現象」と「カーネル視点の実体」を対応付けられるかが大事です。
:::

### 2.

次の 5 つの用語を必ず使って、コンテナ起動の流れを説明してください。

- namespace
- cgroup
- rootfs
- capability
- seccomp

::: details 解答を見る
解答例:

コンテナ起動では、まず image から `rootfs` を用意します。次に `namespace` を作って process に見える PID や network や mount の世界を分けます。続いて `cgroup` で CPU や memory の上限を設定します。その上で `capability` を絞って root 権限を制限し、`seccomp` で不要な syscall を禁止します。最後にその設定の中で process を起動することで、コンテナが成立します。

解説:

5 用語を役割付きで言えれば理解できています。
:::

### 3.

`runc` または `youki` の役割を中心に、「Docker が直接全部やっているわけではない」とはどういう意味か説明してください。

::: details 解答を見る
解答例:

Docker は利用者向けの高レベルツールですが、低レイヤーでは OCI runtime が実際の Linux 機能を使って process を起動します。`runc` や `youki` はその runtime 実装であり、`config.json` と `rootfs` を入力として `namespace`、`cgroup`、mount、`capability`、`seccomp` を設定し、最後にコンテナ内 process を `exec` します。したがって、Docker が直接全部やっているわけではなく、下のレイヤーで runtime が Linux 機能を束ねています。

解説:

Docker と runtime の役割分担を言語化できれば十分です。
:::
