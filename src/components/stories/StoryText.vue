<script setup lang="ts">
  import Dialog from "../shared/Dialog.vue";
  import {computed, ref} from "vue";

  type Props = {
    text?: string;
  }

  type Emits = {
    addCharacter: [string]
  }

  const emit = defineEmits<Emits>();
  const props = defineProps<Props>();
  const actionsDialog = ref(null);
  const hasNoContent = computed(() => props.text && props.text.length <= 0);

  let name: string = "";

  function onSelectionChange(event: CustomEvent) {
    name = event.detail.text;
    actionsDialog.value!.openPopover({x: event.detail.x, y: event.detail.y});
  }

  function addCharacterClick() {
    emit("addCharacter", name);
  }

</script>
<template>
  <p v-selection-change
     @selectionupdate="onSelectionChange"
     :class="{'no-text': hasNoContent}"
     class="story-content">{{props.text || "This story has no content"}}</p>
  <Dialog ref="actionsDialog" v-slot="slotProps">
    <button class="btn" @click="addCharacterClick(); slotProps.close()">Add character</button>
  </Dialog>
</template>
<style lang="scss" scoped>
  .no-text {
    user-select: none;
  }
  .btn {
    display: block;
  }
</style>