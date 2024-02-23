<script setup lang="ts">
import {computed, ref} from "vue";
  import {Story} from "../../models/story.ts";

  interface Props {
    story: Story
  }

  type Emits = {
    update: [Story]
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const editMode = ref(false);
  let updatedValue: string;

  const date = computed(() => {
    return new Intl.DateTimeFormat(undefined, {dateStyle: "full"}).format(props.story.date)
  })

  function toggle() {
    editMode.value = !editMode.value;
  }

  function save() {
    emit("update", {title: props.story.title, date: props.story.date, content: updatedValue});
    editMode.value = false
  }



</script>

<template>
  <div class="story" @dblclick="toggle">
    <div class="story-header">
      <h3>{{props.story.title}}</h3> <button v-if="!editMode" @click="toggle">edit</button> <button v-else @click="save()">Save</button>
    </div>
    <span class="story-date">{{date}}</span>
    <p class="story-content" v-if="!editMode">{{props.story.content || "This story has no content"}}</p>
    <textarea @input="event => updatedValue = event.target?.value" class="story-input" v-else @keydown.esc="toggle" :value="props.story.content"></textarea>
  </div>

</template>

<style scoped>
.story-header {
  display: flex;
  align-items: center;
  gap: 30px;
}
.story-input {
  resize: none;
  width: 100%;
  display: block;
  min-height: 300px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background-color: #eeeeff;
  padding: 8px;
  &:focus {
    box-shadow: 0 4px 2px -2px gray;
  }
}

h3 {
  font-size: 4rem;
  font-weight: normal;
  line-height: 1;
}
</style>