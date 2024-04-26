<script setup lang="ts">

  import {ref} from "vue";
  import {Character} from "../../models/character.ts";
  import {useCharacterStore} from "../../store/characters.ts";

  type Emits = {
    close: [void];
  }

  const store = useCharacterStore();
  const emit = defineEmits<Emits>();

  const name = ref<string>("");
  const race = ref<string>("human");
  const dndClass = ref<string>("");
  const description = ref<string>("");
  const alignment = ref<string>("");
  const dead = ref<boolean>(false);
  const relevant = ref<boolean>(true);

  function saveData(event: Event) {
    event.preventDefault();
    const data: Character = {
      name: name.value,
      class: dndClass.value,
      race: race.value,
      description: description.value,
      alignment: alignment.value,
      dead: dead.value,
      relevant: relevant.value
    };
    store.saveCharacter(data)
        .then(() => {
          emit("close");
        })
  }
</script>

<template>
<div class="dialog">
  <h2 class="dialog--title">Create new character</h2>
  <div class="dialog--content">
    <form id="character-form" @submit="saveData">
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="name">
      </div>
      <div>
        <label for="race">Race</label>
        <select id="race" v-model="race">
          <option value=""></option>
          <option value="dragonborn">Dragonborn</option>
          <option value="dwarf">Dwarf</option>
          <option value="elf">Elf</option>
          <option value="gnome">Gnome</option>
          <option value="half-elf">Half Elf</option>
          <option value="human">Human</option>
          <option value="halfling">Halfling</option>
          <option value="half-orc">Half Orc</option>
          <option value="human">Human</option>
          <option value="Tiefling">Tiefling</option>
        </select>
      </div>
      <div>
        <label for="class">Class</label>
        <select v-model="dndClass">
          <option value=""></option>
          <option value="barbarian">Barbarian</option>
          <option value="bard">Bard</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="fighter">Fighter</option>
          <option value="monk">Monk</option>
          <option value="paladin">Paladin</option>
          <option value="ranger">Ranger</option>
          <option value="rogue">Rogue</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="warlock">Warlock</option>
          <option value="wizard">Wizard</option>
        </select>
      </div>
      <div>
        <label for="description">Description</label>
        <textarea v-model="description"></textarea>
      </div>
      <div>
        <label for="allignment">Allignment</label>
        <select id="allignment" v-model="alignment">
          <option value=""></option>
          <option value="party">Party member</option>
          <option value="trustworthy">Trustworthy</option>
          <option value="friendly">friendly</option>
          <option value="neutral">Neutral</option>
          <option value="enemy">Enemy</option>
        </select>
      </div>
      <div>
        <label for="dead">Dead</label>
        <input id="dead" type="checkbox" v-model="dead">
      </div>
      <div>
        <label for="relevant">Relevant</label>
        <input id="relevant" type="checkbox" v-model="relevant">
      </div>
    </form>
  </div>
  <div class="dialog--actions">
    <button form="character-form" class="btn">Save</button>
  </div>
</div>
</template>
