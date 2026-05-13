---
title: "第9章: OCI runtime / runc / youki"
outline: [2, 3]
prev:
  text: "第8章: seccomp"
  link: /container-internals/08-seccomp
next:
  text: "第10章: 全体まとめ"
  link: /container-internals/10-summary
---

# 第9章: OCI runtime / runc / youki

::: warning 準備中
この章では、Docker と OCI runtime の役割分担を Linux 機能の組み合わせとして整理します。
:::

## Docker / containerd / OCI runtime の関係

## OCI runtime spec とは何か

## `runc` とは何か

## `youki` とは何か

## bundle / `config.json` / `rootfs`

## 起動フロー

```mermaid
flowchart TD
  A[rootfs を用意] --> B[config.json を読む]
  B --> C[namespace を作る]
  C --> D[cgroup を設定]
  D --> E[mount を設定]
  E --> F[capability を設定]
  F --> G[seccomp を設定]
  G --> H[exec でプロセス起動]
```

## この章で理解すべきこと

- OCI runtime が Linux 機能を束ねてコンテナを起動すること
- `runc` と `youki` はその実装例であること
