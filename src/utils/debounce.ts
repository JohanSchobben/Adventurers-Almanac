export function debounce(debounceTime = 0 , callback: Function): Function {
    let timer: any;

    return function(...args: any[]) {
        if(debounceTime <= 0) {
            callback.call(null, ...args)
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {callback.call(null, ...callback.arguments)}, debounceTime)
    }
}