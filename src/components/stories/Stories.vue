<script setup lang="ts">
  import {Story as StoryModel } from "../../models/story.ts";
  import Story from "./Story.vue";

  type Props = {
    stories: StoryModel[]
  }

  type Emits = {
    deleteStory: [number],
    updateStory: [StoryModel]
  }


  const emit = defineEmits<Emits>();
  const props = defineProps<Props>();

  function updateStory(story: StoryModel) {
    emit("updateStory", story);
  }

  function deleteStory(story: number) {
    emit("deleteStory", story);
  }
</script>

<template>
  <div class="stories-list">
    <Story v-for="st in props.stories"
           :story="st"
           :key="st.id"
           @update="updateStory"
           @remove="deleteStory"/>
  </div>
</template>

<style scoped>
  .stories-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
</style>