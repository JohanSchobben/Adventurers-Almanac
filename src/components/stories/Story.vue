<script setup lang="ts">
import {computed, ref} from "vue";
  import {Story} from "../../models/story.ts";
import StoryText from "./StoryText.vue";

  type Props = {
    story: Story
  }

  type Emits = {
    update: [Story]
    remove: [number]
    addCharacter: [string]

  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const editMode = ref(false);

  const date = computed(() => {
    return new Intl.DateTimeFormat(undefined, {dateStyle: "full"}).format(props.story.date)
  })

  function toggle() {
    editMode.value = !editMode.value;
  }

  function save() {
    emit("update", {...props.story});
    editMode.value = false
  }

  function remove() {
    emit("remove", props.story.id!);
  }


</script>

<template>
  <div class="story">
    <div class="story-header">
      <h3 v-if="!editMode">{{props.story.title}}</h3>
      <input class="h3" v-if="editMode" type="text" v-model="props.story.title">
      <div class="story-header-actions">
        <button v-if="!editMode" class="btn" @click="toggle">edit</button>
        <template v-else>
          <button class="btn" @click="remove">Remove</button>
          <button class="btn" @click="save()">Save</button>
        </template>
      </div>
    </div>
    <span class="story-date">{{date}}</span>
    <StoryText
        :text="props.story.content"
        @addCharacter="emit('addCharacter', $event)"
        v-if="!editMode"/>
    <textarea
        v-else
        v-model="props.story.content"
        class="story-input"
        @keydown.esc="toggle"></textarea>
  </div>
</template>

<style scoped lang="scss">
.story-header {
  display: flex;
  align-items: center;
  gap: 30px;
  &-actions {
    margin-left: auto;
  }
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

h3, .h3 {
  font-size: 2rem;
  font-weight: normal;
  line-height: 1;
  border: none;
  letter-spacing: 1px;
}
</style>