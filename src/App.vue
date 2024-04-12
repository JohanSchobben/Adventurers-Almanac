<script setup lang="ts">

  import Stories from "./components/stories/Stories.vue";
  import Dialog from "./components/shared/Dialog.vue";
  import CharacterCreation from "./components/characters/character-creation.vue";
  import {reactive, ref} from "vue";

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
  <button class="btn add-character-btn" @click="addCharacter">
    +
  </button>
  <div class="main-area">
    <Stories />
  </div>
  <Dialog ref="characterDialog">
    <CharacterCreation :name="state.name"/>
  </Dialog>
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

  .add-character-btn {
    position: fixed;
    top: 32px;
    right: 32px;
  }
</style>
