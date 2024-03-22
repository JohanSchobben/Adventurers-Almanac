import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import {pinia} from "./store";
import {SelectionChange} from "./components/shared/SelectionChange.ts";
import {ClickOutside} from "./components/shared/ClickOutside.ts";



const app = createApp(App)

app.directive("selectionChange", SelectionChange)
app.directive("clickOutside", ClickOutside)
app.use(pinia)
app.mount('#app')
