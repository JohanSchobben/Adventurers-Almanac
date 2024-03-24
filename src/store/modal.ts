import {defineStore} from "pinia";

interface State {
    isOpen: boolean
}

export const useDialogStore = defineStore("dialog", {
    state: (): State => {
        return {
            isOpen: false
        }
    },
    actions: {
        open() {
            this.isOpen = true
        }
    }
})