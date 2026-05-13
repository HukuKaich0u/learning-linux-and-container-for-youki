<script setup lang="ts">
import mermaid from "mermaid";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";

const props = defineProps<{
  code: string;
}>();

const route = useRoute();
const diagram = ref<HTMLElement | null>(null);
const errorMessage = ref("");
const decodedCode = computed(() => decodeURIComponent(props.code));

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "neutral"
});

async function renderDiagram() {
  if (!diagram.value) {
    return;
  }

  try {
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    const { svg } = await mermaid.render(id, decodedCode.value);
    diagram.value.innerHTML = svg;
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Mermaid の描画に失敗しました。";
    diagram.value.textContent = decodedCode.value;
  }
}

onMounted(async () => {
  await nextTick();
  await renderDiagram();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    await renderDiagram();
  }
);
</script>

<template>
  <div class="mermaid-diagram">
    <div v-if="errorMessage" class="mermaid-diagram__error">
      Mermaid の描画に失敗しました: {{ errorMessage }}
    </div>
    <div ref="diagram" />
  </div>
</template>
