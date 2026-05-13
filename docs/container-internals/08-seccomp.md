---
title: "第8章: seccomp"
outline: [2, 3]
prev:
  text: "第7章: capability"
  link: /container-internals/07-capability
next:
  text: "第9章: OCI runtime / runc / youki"
  link: /container-internals/09-oci-runtime
---

# 第8章: seccomp

::: warning 準備中
この章では、seccomp を「使える syscall を制限する仕組み」として説明します。
:::

## seccomp の基本

## なぜ syscall を制限するのか

## namespace / cgroup / capability との違い

## Docker のデフォルト seccomp profile

## `/proc/<pid>/status` で見る

## 実験

### 目的

### 実行コマンド

### 期待される出力の例

### 出力の読み方

### 何が理解できるか

### 注意点

## この章で理解すべきこと

- seccomp は syscall レベルの制限であること
- 見え方や資源ではなく、できる操作を狭める仕組みであること
