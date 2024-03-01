<script setup lang="ts">

import Stories from "./components/stories/Stories.vue";
</script>
<template>
  <div class="main-area">
    <Stories/>
  </div>
</template>
<style scoped>
  .main-area {
    height: 100%;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
