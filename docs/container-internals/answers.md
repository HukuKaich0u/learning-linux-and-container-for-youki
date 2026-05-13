---
title: 解答と解説
outline: [2, 3]
prev:
  text: "確認問題"
  link: /container-internals/questions
next:
  text: "ミニプロジェクト"
  link: /container-internals/mini-project
---

# 解答と解説

## 選択問題の解答

### 1. 正解: 3

コンテナは Linux の機能で隔離された process です。  
VM のように別のカーネルを持つわけではありません。

### 2. 正解: 2

namespace は process ごとに見える世界を分けます。  
PID、mount、network、UTS などの見え方が変わります。

### 3. 正解: 2

cgroup は process 群に対して CPU、memory、pids、io などのリソース制御を行います。

### 4. 正解: 2

rootfs は process が見る `/` の中身です。  
イメージから展開されたユーザーランドがここに入ります。

### 5. 正解: 1

mount namespace は、どの filesystem がどこに mount されて見えるかを分離します。

### 6. 正解: 1

capability は root 権限を細かい能力に分割したものです。

### 7. 正解: 3

seccomp は syscall フィルタリングです。  
どの syscall を呼べるかを制限します。

### 8. 正解: 2

OCI runtime は Linux 機能を組み合わせて、実際のコンテナ process を起動します。

### 9. 正解: 1

`runc` と `youki` は、どちらも OCI runtime の実装です。

### 10. 正解: 3

コンテナはホストの Linux カーネルを共有します。  
VM は一般にゲスト OS ごとのカーネルを持ちます。

## 記述問題の解答

### 1. process とは何か

解答例:

Linux における process とは、実行中のプログラムである。  
program はディスク上の実行ファイルやコードそのものだが、process はそれがメモリに読み込まれ、PID を持ち、実行状態になった単位である。

解説:

program と process を分けることが、コンテナ理解の第一歩です。  
コンテナも最終的には process です。

### 2. コンテナが隔離された process であるとは何か

解答例:

コンテナは別カーネルを持つ VM ではなく、ホスト Linux カーネル上で動く process である。ただし、namespace で見える世界を分け、cgroup で資源を制限し、rootfs と mount で別の `/` を見せ、capability と seccomp で権限や syscall を絞ることで、独立した環境のように見せている。

解説:

この一文を自分の言葉で言えるようになることが、この教材の中心目標です。

### 3. namespace の説明

解答例:

namespace は process から見える世界を分離する仕組みである。PID namespace を例にすると、ホストには多数の process が存在していても、ある namespace 内の process からは一部だけが見え、その中での PID 番号も別に見えることがある。

解説:

「存在そのものを消す」のではなく、「見え方を変える」と説明できるかが重要です。

### 4. cgroup と namespace の違い

解答例:

namespace は process に見える世界を分離する仕組みであり、cgroup は process 群に使わせる資源を制限・計測する仕組みである。前者は visibility、後者は resource control の話である。

解説:

この区別は非常に重要です。混同するとコンテナの説明があいまいになります。

### 5. rootfs と mount namespace の説明

解答例:

rootfs は process に見せたい `/` の中身である。mount namespace を使うと、process ごとに別の mount 構成を見せられるため、その namespace の中で rootfs を `/` として見せることで、コンテナごとに異なる filesystem 世界を作れる。

解説:

「見せたい中身」と「見せる舞台」を分けて説明できると理解が深いです。

### 6. `chroot` と `pivot_root` の違い

解答例:

`chroot` は process から見た root directory を変える仕組みである。`pivot_root` は mount 構成の中で新しい rootfs を本格的に root に切り替え、古い root を退避させるための仕組みであり、コンテナ runtime でより本格的に使われる。

解説:

初学者向けには、「`chroot` は簡易的」「`pivot_root` は runtime 的」と整理すると分かりやすいです。

### 7. capability の説明

解答例:

capability は、従来 1 つに見えていた強い root 権限を細かい能力へ分割する仕組みである。そのため process ごとに必要な能力だけ残し、不要な能力を落とせる。これにより、コンテナ内で root に見えてもホスト root と同じ強さではない状態を作れる。

解説:

`uid=0` と capability 集合は別の層です。

### 8. seccomp と capability の違い

解答例:

capability は root 権限を細かい能力に分けて、何が許されるかを制御する。一方 seccomp は syscall フィルタであり、そもそもどの syscall を呼べるかを制御する。つまり capability は権限、seccomp は kernel 入口の制限である。

解説:

両方とも security ですが、層が違います。

### 9. OCI bundle の説明

解答例:

OCI bundle は `config.json` と `rootfs` を中心とする runtime 入力である。`rootfs` はコンテナに見せる filesystem の中身であり、`config.json` はどの process を、どんな namespace、cgroup、mount、capability、seccomp 設定で起動するかを表す。

解説:

bundle を理解すると runtime の仕事がかなり具体的になります。

### 10. `docker run` の裏側

解答例:

`docker run` の裏側では、まずイメージから rootfs を用意し、OCI runtime が `config.json` を読み、namespace を作り、cgroup を設定し、mount を組み、capability を調整し、seccomp profile を適用して、最後に `exec` でコンテナ内 process を起動する。

解説:

流れを順番で言えることが大切です。

## コマンド読解問題の解答

### 1.

解答例:

現在の shell の PID は 18452、親 process の PID は 17120、process 名は `bash` だと分かる。つまり shell も 1 個の Linux process であり、親子関係を持っている。

解説:

`/proc/<pid>/status` は process 観察の基本です。

### 2.

解答例:

現在の shell は `pid:[4026531836]` という PID namespace に所属していることが分かる。同じ番号の process は同じ PID namespace に属している。

解説:

`/proc/<pid>/ns/*` は namespace 観察に重要です。

### 3.

解答例:

現在の process は cgroup v2 の `/user.slice/user-1000.slice/session-2.scope` に所属していると分かる。つまり Linux はこの process を cgroup 階層の中で管理している。

解説:

個々の process は cgroup の外で勝手に動いているわけではありません。

### 4.

解答例:

この process には `CapPrm` や `CapEff` として何らかの capability 集合が設定されていると分かる。capability は process ごとに保持され、root 権限が細かく分割されて表現される。

解説:

数値をそのまま覚える必要はありませんが、「能力集合がある」と読めれば十分です。

### 5.

解答例:

`Seccomp: 2` なので、この process には seccomp フィルタが有効になっていると分かる。つまり呼べる syscall が何らかのルールで制限されている。

解説:

seccomp は process 単位で観察できます。

## Docker の裏側を説明する総合問題の解答

### 1.

解答例:

`docker run --rm -it ubuntu bash` を実行すると、利用者からは Ubuntu 環境の shell が開いたように見える。しかし Linux カーネル視点では、別のカーネルを起動しているのではなく、OCI runtime が rootfs を用意し、namespace で見える世界を分け、cgroup で資源制御を設定し、mount で filesystem 世界を作り、capability と seccomp で権限と syscall を絞った上で、`bash` process を起動している。

解説:

「見える現象」と「カーネル視点の実体」を対応付けられるかが大事です。

### 2.

解答例:

コンテナ起動では、まず image から rootfs を用意する。次に namespace を作って process に見える PID や network や mount の世界を分ける。続いて cgroup で CPU や memory の上限を設定する。その上で capability を絞って root 権限を制限し、seccomp で不要な syscall を禁止する。最後にその設定の中で process を起動することで、コンテナが成立する。

解説:

5 用語を役割付きで言えれば理解できています。

### 3.

解答例:

Docker は利用者向けの高レベルツールだが、低レイヤーでは OCI runtime が実際の Linux 機能を使って process を起動する。`runc` や `youki` はその runtime 実装であり、`config.json` と `rootfs` を入力として namespace、cgroup、mount、capability、seccomp を設定し、最後にコンテナ内 process を `exec` する。したがって、Docker が直接全部やっているわけではなく、下のレイヤーで runtime が Linux 機能を束ねている。

解説:

Docker と runtime の役割分担を言語化できれば十分です。
