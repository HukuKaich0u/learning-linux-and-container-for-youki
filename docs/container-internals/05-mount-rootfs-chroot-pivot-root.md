---
title: "第5章: mount / rootfs / chroot / pivot_root"
outline: [2, 3]
prev:
  text: "第4章: namespace"
  link: /container-internals/04-namespace
next:
  text: "第6章: cgroup / cgroup v2"
  link: /container-internals/06-cgroup-v2
---

# 第5章: mount / rootfs / chroot / pivot_root

::: warning 準備中
この章では、コンテナが別の `/` を見ている理由を rootfs と mount の観点から説明します。
:::

## mount とは何か

## rootfs とは何か

## chroot が変えるもの

## pivot_root が変えるもの

## mount namespace と組み合わせる意味

## Docker コンテナ内の `/` が違う理由

## 実験

### 目的

### 実行コマンド

### 期待される出力の例

### 出力の読み方

### 何が理解できるか

### 注意点

## この章で理解すべきこと

- rootfs はプロセスから見える `/` の中身であること
- mount namespace と rootfs の組み合わせで別環境が見えること
