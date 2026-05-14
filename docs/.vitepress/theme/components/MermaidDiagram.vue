<script setup lang="ts">
import mermaid from "mermaid";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";

const props = defineProps<{
  code: string;
}>();

const route = useRoute();
const container = ref<HTMLElement | null>(null);
const diagram = ref<HTMLElement | null>(null);
const errorMessage = ref("");
const decodedCode = computed(() => decodeURIComponent(props.code));
let resizeObserver: ResizeObserver | null = null;
let renderRequestId = 0;

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "neutral",
  themeVariables: {
    fontSize: "14px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  }
});

async function waitForFonts() {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return;
  }

  try {
    await document.fonts.ready;
  } catch {
    // Ignore font loading errors and render with currently available fonts.
  }
}

async function renderDiagram() {
  if (!diagram.value) {
    return;
  }

  const requestId = ++renderRequestId;
  await waitForFonts();

  if (!diagram.value || requestId !== renderRequestId) {
    return;
  }

  try {
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    const { svg } = await mermaid.render(id, decodedCode.value);
    if (!diagram.value || requestId !== renderRequestId) {
      return;
    }
    diagram.value.innerHTML = svg;
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Mermaid の描画に失敗しました。";
    diagram.value.textContent = decodedCode.value;
  }
}

function scheduleRender() {
  void nextTick().then(renderDiagram);
}

function handleResize() {
  scheduleRender();
}

onMounted(async () => {
  await nextTick();
  await renderDiagram();

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  if (typeof ResizeObserver !== "undefined" && container.value) {
    resizeObserver = new ResizeObserver(() => {
      scheduleRender();
    });
    resizeObserver.observe(container.value);
  }

  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.addEventListener("loadingdone", handleResize);
  }
});

watch(
  () => route.path,
  async () => {
    scheduleRender();
  }
);

watch(decodedCode, () => {
  scheduleRender();
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize);
  }

  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.removeEventListener("loadingdone", handleResize);
  }

  resizeObserver?.disconnect();
});
</script>

<template>
  <div ref="container" class="mermaid-diagram">
    <div v-if="errorMessage" class="mermaid-diagram__error">
      Mermaid の描画に失敗しました: {{ errorMessage }}
    </div>
    <div ref="diagram" />
  </div>
</template>
