<script setup lang="ts">
  import {ref} from "vue";

  type Props = {
    companionName: string;
  }

  type Emits = {
    nameUpdate: [string]
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const titleInput = ref<string>(props.companionName);
  const editMode = ref<boolean>(false);

  function onEscapeClick(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    target.blur();
  }

  function onEditModeLeave() {
    editMode.value = false;
    emit("nameUpdate", titleInput.value);
  }

</script>

<template>
  <div>
    <input class="title"
           v-model="titleInput"
           :readonly="!editMode"
           @focus="editMode = true"
           @blur="onEditModeLeave"
           @keydown.esc="onEscapeClick"/>
  </div>
  <nav class="nav">
    <router-link active-class="nav-item-active" class="nav-item" to="/">Stories</router-link>
    <router-link active-class="nav-item-active" class="nav-item" to="/characters">Characters</router-link>
    <router-link active-class="nav-item-active" class="nav-item" to="/objectives">Objectives</router-link>
    <router-link active-class="nav-item-active" class="nav-item" to="/sketches">Sketches</router-link>
    <router-link active-class="nav-item-active" class="nav-item" to="/settings">Settings</router-link>
  </nav>
</template>

<style scoped lang="scss">
  .title {
    font-size: 64px;
    font-weight: 600;
    border: none;
    padding: 12px 0;
    text-align: center;
    &:focus {
      outline: none;
    }
  }

  .nav {
    display: flex;
    justify-content: space-around;
    &-item {
      background-color: #A1887F;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      color: white;
      padding: 0.8rem 1.2rem;
      font-weight: 600;
      text-decoration: none;
      &:hover {
        background-color: #6D4C41;
      }
      &-active {
        background-color: #3E2723;
        pointer-events: none;
      }
    }
  }
</style>