import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import MermaidDiagram from "./components/MermaidDiagram.vue";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("MermaidDiagram", MermaidDiagram);
  }
} satisfies Theme;
