import { defineConfig } from "vitepress";

const courseSidebar = [
  {
    text: "はじめに",
    items: [
      { text: "教材トップ", link: "/container-internals/" },
      { text: "用語ガイド", link: "/container-internals/glossary" }
    ]
  },
  {
    text: "本編",
    items: [
      { text: "第1章: コンテナの正体を先に掴む", link: "/container-internals/01-overview" },
      { text: "第2章: process と /proc", link: "/container-internals/02-process-and-proc" },
      { text: "第3章: syscall と user space / kernel space", link: "/container-internals/03-syscall-and-kernel" },
      { text: "第4章: namespace", link: "/container-internals/04-namespace" },
      { text: "第5章: mount / rootfs / chroot / pivot_root", link: "/container-internals/05-mount-rootfs-chroot-pivot-root" },
      { text: "第6章: cgroup / cgroup v2", link: "/container-internals/06-cgroup-v2" },
      { text: "第7章: capability", link: "/container-internals/07-capability" },
      { text: "第8章: seccomp", link: "/container-internals/08-seccomp" },
      { text: "第9章: OCI runtime / runc / youki", link: "/container-internals/09-oci-runtime" },
      { text: "第10章: 全体まとめ", link: "/container-internals/10-summary" }
    ]
  },
  {
    text: "演習と次の一歩",
    items: [
      { text: "確認問題", link: "/container-internals/questions" },
      { text: "ミニプロジェクト", link: "/container-internals/mini-project" },
      { text: "次に読む資料", link: "/container-internals/next-steps" }
    ]
  }
];

export default defineConfig({
  lang: "ja-JP",
  title: "Linux Container Learning",
  description: "Linux とコンテナの仕組みを学ぶ日本語教材",
  cleanUrls: true,
  markdown: {
    config(md) {
      const originalFence = md.renderer.rules.fence;

      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index];

        if (token.info.trim() === "mermaid") {
          const encoded = encodeURIComponent(token.content);
          return `<MermaidDiagram code="${encoded}" />`;
        }

        if (originalFence) {
          return originalFence(tokens, index, options, env, self);
        }

        return self.renderToken(tokens, index, options);
      };
    }
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "教材トップ", link: "/container-internals/" }
    ],
    search: {
      provider: "local"
    },
    outline: {
      level: [2, 3],
      label: "このページの内容"
    },
    docFooter: {
      prev: "前へ",
      next: "次へ"
    },
    sidebar: {
      "/container-internals/": courseSidebar
    }
  }
});
