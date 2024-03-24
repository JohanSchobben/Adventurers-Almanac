import {Directive, DirectiveBinding} from "vue";
import {emit, off, on} from "../../utils/event-listener";
import {debounce} from "../../utils/debounce.ts";

const emitter = debounce(300, (el: HTMLElement, options: any) => {
    el.dispatchEvent(new CustomEvent("selectionupdate", {detail: options}))
})


export const SelectionChange: Directive<HTMLElement> = {
    mounted(el: HTMLElement, _binding: DirectiveBinding, node) {
        el.addEventListener("selectionchange", function() {
            console.log("change");
            const selection = document.getSelection();
            if(!selection) return;
            if(!selection.toString()) return;
            if(!selection.isCollapsed) return;
            const range = selection.getRangeAt(0);
            const rect = range.getClientRects();
            emitter(el, {
                x: rect.item(0)?.x,
                y: (rect.item(0)?.y ?? 0) + (rect.item(0)?.height ?? 0),
                text: selection.toString(),
                selection
            });
        });
    }
}
