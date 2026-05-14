---
layout: home

hero:
  name: "Linux Container Learning"
  text: "Linux コンテナの仕組みを学ぶ教材"
  tagline: "Docker の裏側を、Linux の基本機能から理解する"
  actions:
    - theme: brand
      text: 教材トップを見る
      link: /container-internals/
---

# Linux コンテナの仕組み

## 何を解説しているか

Docker の裏側で使われている `process`、`namespace`、`cgroup`、`rootfs`、`capability`、`seccomp`、OCI runtime の役割を、Linux の仕組みから順に解説します。

## ターゲット

Docker を触ったことはあるが、コンテナの中身はまだ曖昧な初学者を想定しています。

## 章

- 用語ガイド
- 第1章: コンテナの正体を先に掴む
- 第2章: process と `/proc`
- 第3章: syscall と user space / kernel space
- 第4章: namespace
- 第5章: mount / rootfs / `chroot` / `pivot_root`
- 第6章: `cgroup` / `cgroup v2`
- 第7章: capability
- 第8章: seccomp
- 第9章: OCI runtime / `runc` / `youki`
- 第10章: 全体まとめ

## リンク

- [教材トップを見る](/container-internals/)
