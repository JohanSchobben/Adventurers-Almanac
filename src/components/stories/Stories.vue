<script setup lang="ts">
interface State {
  stories: StoryModel[];
}

import { reactive, } from "vue";
  import {Story as StoryModel} from "../../models/story.ts";
  import Story from "./Story.vue";

  const state = reactive<State>({
    stories: []
  });

  function addStory() {
    state.stories.push({
      date: new Date(),
      title: `Advanture #${state.stories.length + 1}`,
      content: 'Write something epic'
    })
  }
  function updateStory(story: any, index: number) {
    console.log(story.content);
    state.stories.splice(index, 1, story);
  }
</script>

<template>
  <div class="wrapper">
    <Story v-for="(st, index) in state.stories" :story="st" :key="st.date.getTime()" @update="updateStory($event, index)" />
    <button @click="addStory">Add new Button</button>
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    padding: 0.5em;
  }
</style>