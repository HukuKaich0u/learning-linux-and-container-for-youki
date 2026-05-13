---
title: "第4章: namespace"
outline: [2, 3]
prev:
  text: "第3章: syscall と user space / kernel space"
  link: /container-internals/03-syscall-and-kernel
next:
  text: "第5章: mount / rootfs / chroot / pivot_root"
  link: /container-internals/05-mount-rootfs-chroot-pivot-root
---

# 第4章: namespace

::: warning 準備中
この章では、namespace を「見える世界を分ける仕組み」として整理します。
:::

## namespace の考え方

## PID namespace

## Mount namespace

## Network namespace

## UTS / IPC / User / Cgroup namespace

## `lsns` と `/proc/<pid>/ns` で観察する

## 実験

### 目的

### 実行コマンド

### 期待される出力の例

### 出力の読み方

### 何が理解できるか

### 注意点

## この章で理解すべきこと

- namespace は存在そのものではなく見え方を分離すること
- Docker コンテナで `ps` や `hostname` が変わって見える理由
