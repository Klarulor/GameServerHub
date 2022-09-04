export function log(content: string){
    const now = new Date();
    const text = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] [${content}]`;
    console.log(text);
}