import CharacterPage from "../components/characters/CharacterPage.vue";
import StoryPage from "../components/stories/StoryPage.vue";
import ObjectivePage from "../components/objectives/ObjectivePage.vue";
import SketchesPage from "../components/sketches/SketchesPage.vue";
import SettingsPage from "../components/settings/SettingsPage.vue";

export const ROUTES = [
    { path: '/', component: StoryPage },
    { path: '/characters', component: CharacterPage },
    { path: '/objectives', component: ObjectivePage},
    { path: '/sketches', component: SketchesPage},
    { path: '/settings', component: SettingsPage},
]