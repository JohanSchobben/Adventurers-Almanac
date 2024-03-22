import {Directive, DirectiveBinding} from "vue";
import {emit, off, on} from "../../utils/event-listener";

document.addEventListener("mouseup", () => {
    const selection = document.getSelection();
    if(!selection) return;
    if(!selection.toString()) return;
    if(selection.anchorNode !== selection.focusNode) return;
    const range = selection.getRangeAt(0);
    const rect = range.getClientRects();
    emit("selection", {
        x: rect.item(0)?.x,
        y: (rect.item(0)?.y ?? 0) + (rect.item(0)?.height ?? 0),
        text: selection.toString()
    });
})


export const SelectionChange: Directive<HTMLElement> = {
    mounted(el: HTMLElement, _binding: DirectiveBinding, node) {
        el.dataset.listenerId = on("selection", (data: any) => {
            node.el.dispatchEvent(new CustomEvent("selectionupdate", {detail: data}))
        })
    },
    beforeUnmount(el: HTMLElement) {
        off(el.dataset.listenerId!);
    }
}
