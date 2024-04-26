import StoryPage from "../components/stories/StoryPage.vue";
import CharacterPage from "../components/characters/CharacterPage.vue";

export const ROUTES = [
    { path: '/', component: StoryPage },
    { path: '/characters', component: CharacterPage }
]