<script setup lang="ts">
import {useStoriesStore} from "../../store/stories.ts";
import {onMounted} from "vue";
import Stories from "./Stories.vue";
import {Story} from "../../models/story.ts";

const store = useStoriesStore();

onMounted(() => {
  store.getAllStories()
})

function deleteStory(id: number) {
  store.removeStory(id);
}

function updateStory(story: Story) {
  store.updateStory(story);
}

</script>

<template>
  <Stories :stories="store.stories"
           @deleteStory="deleteStory"
           @updateStory="updateStory"/>
</template>
