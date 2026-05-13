---
title: "第3章: syscall と user space / kernel space"
outline: [2, 3]
prev:
  text: "第2章: process と /proc"
  link: /container-internals/02-process-and-proc
next:
  text: "第4章: namespace"
  link: /container-internals/04-namespace
---

# 第3章: syscall と user space / kernel space

::: warning 準備中
この章では、アプリケーションが syscall を通じて kernel に依頼する構造を扱います。
:::

## user space と kernel space

## なぜ直接ハードウェアを触れないのか

## syscall とは何か

## 代表的な syscall

## runtime が syscall をどう使うか

## 実験

### 目的

### 実行コマンド

### 期待される出力の例

### 出力の読み方

### 何が理解できるか

### 注意点

## この章で理解すべきこと

- syscall が user space と kernel space の境界であること
- コンテナ runtime が Linux 機能を syscall 経由で使うこと
