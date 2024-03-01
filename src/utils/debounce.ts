export function debounce(debounceTime = 0 , callback: Function): Function {
    let timer: any;

    return function() {
        if(debounceTime <= 0) {
            callback();
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => callback(), debounceTime)
    }
}