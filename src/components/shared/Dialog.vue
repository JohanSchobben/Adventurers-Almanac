<script setup lang="ts">
import {computed, reactive} from "vue";
import {clamp} from "../../utils/maths.ts";

  type Emits = {
    close: [void]
  }

  type State = {
    x: number;
    y: number;
    isOpen: boolean,
    sizeUnit: "px" | "%",
    dialogType: "popover" | "modal"
  }

  const state = reactive<State>({
    x: 0,
    y: 0,
    isOpen: false,
    sizeUnit: "px",
    dialogType: "popover"
  });

  const emit = defineEmits<Emits>();
  const x = computed(() => `${state.x}${state.sizeUnit}`);

  const y = computed(() => `${state.y}${state.sizeUnit}`);

  function openPopover(options: Pick<State, "x" | "y">) {
    const {
        x = 0,
        y = 0
    } = options
    if (state.isOpen) return;
    state.sizeUnit = "px";
    state.x = clamp(0, document.body.scrollWidth - 170, Math.round(x));
    state.y = clamp(0, document.body.scrollHeight - 100, Math.round(y + 4));
    state.dialogType = "popover";
    state.isOpen = true;
  }

  function openModal() {
    state.sizeUnit = "%";
    state.x = 50;
    state.y = 50;
    state.dialogType = "modal"
    state.isOpen = true;
    document.body.classList.add("noscroll");
  }

  function close() {
    state.isOpen = false;
    document.body.classList.remove("noscroll");
    emit("close");
  }

  defineExpose({
    openPopover,
    openModal
  })

</script>

<template>
    <Teleport to="body">
      <div v-if="state.isOpen" class="backdrop" :class="{'backdrop-modal': state.dialogType === 'modal'}" @click="close">
        <div class="overlay" :class="{'overlay-modal': state.dialogType === 'modal'}" @click.stop>
          <slot :close="close" />
        </div>
      </div>
    </Teleport>
</template>

<style scoped lang="scss">
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 50;
    pointer-events: all;
    &-modal {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .overlay {
    position: absolute;
    top: v-bind(y);
    left: v-bind(x);
    z-index: 100;
    &-modal {
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
  }
</style>