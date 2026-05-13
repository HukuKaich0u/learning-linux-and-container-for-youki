---
title: "第7章: capability"
outline: [2, 3]
prev:
  text: "第6章: cgroup / cgroup v2"
  link: /container-internals/06-cgroup-v2
next:
  text: "第8章: seccomp"
  link: /container-internals/08-seccomp
---

# 第7章: capability

::: warning 準備中
この章では、強すぎる root 権限を capability で分割する考え方を扱います。
:::

## root はなぜ強すぎるのか

## capability の基本

## 代表的な capability

## コンテナ内 root とホスト root の違い

## Docker の `--cap-add` / `--cap-drop` / `--privileged`

## `/proc/<pid>/status` で観察する

## 実験

### 目的

### 実行コマンド

### 期待される出力の例

### 出力の読み方

### 何が理解できるか

### 注意点

## この章で理解すべきこと

- capability は root 権限の細分化であること
- コンテナでは root でも全部の権限を持たないことがあること
