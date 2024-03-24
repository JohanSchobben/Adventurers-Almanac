<script setup lang="ts">
  type Props = {
    name: string
  };

  const props = defineProps<Props>();
</script>

<template>
<div style="background-color: white; height: 100px; width: 100px;">Hello {{props.name}}</div>

</template>

<style scoped>

</style>