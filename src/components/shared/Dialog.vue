<script setup lang="ts">
import {computed, reactive} from "vue";
import {clamp} from "../../utils/maths.ts";

  type Emits = {
    close: [void]
  }

  const state = reactive({x: 0, y: 0, isOpen: false});

  const emit = defineEmits<Emits>();
  const x = computed(() => `${state.x}px`);

  const y = computed(() => `${state.y}px`);

  function open(x: number, y: number) {
    if (state.isOpen) return;
    console.log("open")
    state.x = clamp(0, document.body.scrollWidth - 170, Math.round(x));
    state.y = clamp(0, document.body.scrollHeight - 100, Math.round(y + 4));
    state.isOpen = true;
  }

  function close() {
    console.log("close");
    state.isOpen = false;
    emit("close");
  }

  defineExpose({
    open
  })

</script>

<template>
    <Teleport to="body">
      <div v-if="state.isOpen" class="backdrop" @click="close">
        <div class="overlay" @click.stop>
          <slot/>
        </div>
      </div>
    </Teleport>
</template>

<style scoped>
  .backdrop {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 50;
    pointer-events: all;

  }
  .overlay {
    position: absolute;
    top: v-bind(y);
    left: v-bind(x);
    z-index: 100;
  }
</style>