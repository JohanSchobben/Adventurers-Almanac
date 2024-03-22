const listeners: Record<string, Record<string, Function>> = {};



export const on = (eventName: string, callback: Function) => {
    const id = Date.now().toString();
    listeners[eventName] ??= {};
    listeners[eventName][id] = callback;
    return id;
}

export const emit = (eventName: string, ...args: any[]) => {
    if (!listeners[eventName]) return;
    Object.values(listeners[eventName]).forEach((cb) => {
        cb(...args);
    });
}

export const off = (id: string) => {
    for (const key of Object.keys(listeners)) {
        if (!listeners[key].hasOwnProperty(id)) continue;
        delete listeners[key][id];
        break;
    }
}
