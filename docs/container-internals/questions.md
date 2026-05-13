---
title: 確認問題
outline: [2, 3]
prev:
  text: "第10章: 全体まとめ"
  link: /container-internals/10-summary
next:
  text: "解答と解説"
  link: /container-internals/answers
---

# 確認問題

このページでは問題だけを載せます。  
まずは自力で考え、次の [解答と解説](/container-internals/answers) は後から見るのがおすすめです。

## 選択問題

### 1. コンテナの正体として最も適切なのはどれですか

1. 別の物理マシン
2. 別の Linux カーネルを持つ仮想マシン
3. Linux の機能で隔離された process
4. Docker 専用の新しい実行単位

### 2. `namespace` の役割として最も適切なのはどれですか

1. CPU 使用率を制限する
2. 見える世界を分ける
3. root 権限を細かく分ける
4. syscall を拒否する

### 3. `cgroup` の役割として最も適切なのはどれですか

1. 見える process 一覧を変える
2. 使える資源を制限・計測する
3. `/` の中身を差し替える
4. hostname を変える

### 4. `rootfs` の説明として正しいものはどれですか

1. Linux カーネル本体
2. process が見る `/` の中身
3. Docker daemon の設定ファイル
4. seccomp profile の保存場所

### 5. `mount namespace` が主に分離するものはどれですか

1. process が見える mount 構成
2. CPU 利用率
3. capability の一覧
4. syscall テーブル

### 6. `capability` の説明として最も適切なのはどれですか

1. root 権限を細かく分割したもの
2. process ID を管理する仕組み
3. メモリ上限を決める仕組み
4. network namespace の別名

### 7. `seccomp` が制限する対象はどれですか

1. PID 番号
2. メモリ使用量
3. 使える syscall
4. 見える mount 一覧

### 8. OCI runtime の役割として最も適切なのはどれですか

1. Linux カーネルを差し替える
2. Linux 機能を組み合わせてコンテナ process を起動する
3. Dockerfile をビルドするだけ
4. イメージ registry を提供する

### 9. `runc` と `youki` の関係として正しいものはどれですか

1. どちらも OCI runtime の実装
2. どちらも Linux ディストリビューション名
3. どちらも cgroup controller 名
4. どちらも network namespace の別名

### 10. コンテナと VM の違いとして正しいものはどれですか

1. コンテナは必ず別カーネルを起動する
2. VM は namespace だけで作られる
3. コンテナはホストカーネルを共有する
4. VM では rootfs は不要である

## 記述問題

### 1.

Linux における process とは何かを、program との違いも含めて説明してください。

### 2.

コンテナが「VM ではなく隔離された process」であるとはどういう意味かを説明してください。

### 3.

namespace が「見える世界を分離する」とはどういう意味か、PID namespace を例に説明してください。

### 4.

cgroup と namespace の役割の違いを説明してください。

### 5.

rootfs と mount namespace を組み合わせると、なぜコンテナごとに違う `/` を見せられるのか説明してください。

### 6.

`chroot` と `pivot_root` の違いを説明してください。

### 7.

capability によって、なぜ「root だけど何でもできるわけではない」状態を作れるのか説明してください。

### 8.

seccomp と capability の違いを説明してください。

### 9.

OCI bundle に含まれる `config.json` と `rootfs` の役割を説明してください。

### 10.

`docker run` の裏側で、どの Linux 機能がどの順で使われるかを説明してください。

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

### 2.

次の出力を読み、何が分かるか説明してください。

```text
$ readlink /proc/$$/ns/pid
pid:[4026531836]
```

### 3.

次の出力を読み、何が分かるか説明してください。

```text
$ cat /proc/self/cgroup
0::/user.slice/user-1000.slice/session-2.scope
```

### 4.

次の出力を読み、何が分かるか説明してください。

```text
$ cat /proc/$$/status | grep Cap
CapPrm: 00000000a80425fb
CapEff: 00000000a80425fb
```

### 5.

次の出力を読み、何が分かるか説明してください。

```text
$ cat /proc/self/status | grep Seccomp
Seccomp:        2
Seccomp_filters: 1
```

## Docker の裏側を説明する総合問題

### 1.

`docker run --rm -it ubuntu bash` を実行したとき、利用者から見える現象と、Linux カーネルの視点で起きていることを対応付けて説明してください。

### 2.

次の 5 つの用語を必ず使って、コンテナ起動の流れを説明してください。

- namespace
- cgroup
- rootfs
- capability
- seccomp

### 3.

`runc` または `youki` の役割を中心に、「Docker が直接全部やっているわけではない」とはどういう意味か説明してください。
