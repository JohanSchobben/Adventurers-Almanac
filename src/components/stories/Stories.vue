<script setup lang="ts">
  import {Story as StoryModel} from "../../models/story.ts";
  import Story from "./Story.vue";
  import {useStoriesStore} from "../../store/stories.ts";
  import {onMounted} from "vue";

  type Events = {
    addCharacter: [string]
  }

  const store = useStoriesStore();
  const emit = defineEmits<Events>();

  onMounted(() => {
    store.getAllStories()
  })


  function addStory() {
    store.saveStory({
      date:new Date(),
      title: "Adventure #" + (store.stories.length + 1),
      content: ""
    });
  }
  function updateStory(story: StoryModel) {
    store.updateStory(story);
  }

  function removeStory(id: number) {
    store.removeStory(id);
  }

  function onAddCharacter(name: string) {
    emit("addCharacter", name)
  }
</script>

<template>
  <div class="wrapper">
    <Story v-for="st in store.allStories"
           :story="st"
           :key="st.id"
           @addCharacter="onAddCharacter"
           @update="updateStory"
           @remove="removeStory"/>
    <button class="btn" @click="addStory">Add new Button</button>
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