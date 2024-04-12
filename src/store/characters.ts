import {defineStore} from "pinia";
import {Character} from "../models/character.ts";
import {getAll, save} from "../utils/idb.ts";

interface State {
    characters: Character[];
}
export const useCharacterStore = defineStore("character", {
    state: (): State => {
        return {
            characters: []
        }
    },
    getters: {
        allCharacters: (state) => state.characters,
        allNames: ({characters}) => characters.map(({name}) => name)
    },
    actions: {
        async saveCharacter(character: Character) {
            character.id = await save("characters", character);
            this.characters.push(character)
        },
        async getAllCharacters() {
            this.characters = await getAll<Character>("characters");
        }
    }
});