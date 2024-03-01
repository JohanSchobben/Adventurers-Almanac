import {defineStore} from "pinia";
import {Story} from "../models/story";
import {getAll, remove, save, update} from "../utils/idb.ts";

interface State {
    stories: Story[]
}

export const useStoriesStore = defineStore("stories", {
    state: (): State => {
        return {
            stories: []
        }
    },
    getters: {
        allStories: (state) => state.stories
    },
    actions: {
        async getAllStories() {
            this.stories = await getAll<Story>("stories");
        },
        async saveStory(story: Story) {
            story.id = await save("stories", story);
            this.stories.push(story)
        },
        async updateStory(story: Story) {
            await update("stories", story);
            this.stories = this.stories.map(s => s.id === story.id ? story : s);
        },
        async removeStory(id: number) {
            await remove("stories", id)
            this.stories = this.stories.filter(st => st.id !== id);
        }
    }
})