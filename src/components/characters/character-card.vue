<script setup lang="ts">
  import {Character} from "../../models/character.ts";

  type Props = {
    character: Character
  }
  var props = defineProps<Props>();


</script>

<template>
  <div class="character-card">
    <h2 class="character-title">{{props.character.name}}</h2>
    <span class="character-subtitle">{{props.character.race}} {{props.character.class}}</span>
    <div class="character-ihfo">
      <span>{{ props.character.dead ? 'dead' : 'alive' }}</span>
      <span><template v-if="!props.character.relevant">not</template> relevant</span>
      <div>
        {{props.character.description}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>