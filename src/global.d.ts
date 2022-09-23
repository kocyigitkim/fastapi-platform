// define global variable to window

interface Window {
    call: (...args: any[]) => Promise<any>;
}
