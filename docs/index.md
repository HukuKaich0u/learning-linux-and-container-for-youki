---
layout: home

hero:
  name: "Linux Container Learning"
  text: "Linux コンテナの仕組みを学ぶ教材"
  tagline: "コンテナ技術の全体像と、Linux の基本機能をつなげて理解する"
  actions:
    - theme: brand
      text: 教材トップを見る
      link: /container-internals/
---

# Linux コンテナの仕組み

## 注意

これは主に作者自身の学習のために作っている教材です。内容の正確性を保証するものではないため、学習の参考資料のひとつとして使ってください。

## 何を解説しているか

container 技術全体の見取り図を先に押さえたうえで、`process`、`namespace`、`cgroup`、`rootfs`、`capability`、`seccomp`、OCI runtime の役割を、Linux の仕組みから順に解説します。

## ターゲット

Docker を触ったことはあるが、container 技術全体の構図や Linux 側の仕組みはまだ曖昧な初学者を想定しています。

## 章

- 第0章: コンテナ技術の全体像
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
