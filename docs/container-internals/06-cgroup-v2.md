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

::: warning 準備中
cgroup を「使える資源を制限・計測する仕組み」として整理し、v2 前提で説明します。
:::

## cgroup の基本

## namespace との違い

## CPU / memory / pids / io

## cgroup v1 と v2 のざっくり差分

## systemd と cgroup

## `/sys/fs/cgroup` を観察する

## 実験

### 目的

### 実行コマンド

### 期待される出力の例

### 出力の読み方

### 何が理解できるか

### 注意点

## この章で理解すべきこと

- cgroup はプロセス群に対する資源制御であること
- Docker のリソース制限オプションが cgroup に対応すること
