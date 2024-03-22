import {Directive} from "vue";
import {emit, on} from "../../utils/event-listener.ts";

document.addEventListener("mousedown", ev => {
    if (ev.target) {
        emit("mousedown", ev);
    }
});


export const ClickOutside: Directive<HTMLElement> = {
    mounted: el => {
        el.dataset.mousedownListener = on("mousedown", (event: MouseEvent) => {
            if (!el.contains(event.target as HTMLElement)) {
                el.dispatchEvent(new CustomEvent("clikoutside", {bubbles: true}));
            }
        })
    }
}