<script setup lang="ts">

  import {reactive, ref} from "vue";
  import Header from "./components/characters/Header.vue";

  type State = {
    name: string
  }

  const state = reactive<State>({name: ""})
  const characterDialog = ref(null);
  function addCharacter() {
    characterDialog.value!.openModal();
  }

</script>
<template>
  <div class="main-area">
    <div class="header-section">
      <Header companion-name="The hunt of Lord GlassStaff"/>
    </div>
    <RouterView />
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

  .header-section {
    margin-bottom: 1rem;
  }

  .add-character-btn {
    position: fixed;
    top: 32px;
    right: 32px;
  }
</style>
