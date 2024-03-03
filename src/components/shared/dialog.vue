<script setup lang="ts">
  type Emits = {
    close: [void]
  }

  type Props = {
    x: number,
    y: number
  }

  const emit = defineEmits<Emits>();
  const props = defineProps<Props>();

</script>

<template>
    <Teleport to="body">
      <div class="overlay">
        <slot/>
      </div>
    </Teleport>
</template>

<style scoped>
  .overlay {
    background-color: red;
    width: 160px;
    height: 90px;
    position: absolute;
    top: v-bind('props.y')px;
    left: v-bind('props.x')px;
  }
</style>