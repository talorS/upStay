import * as fs from 'fs';

export class TempFile implements Disposable {
    #path: string;
    #handle: number;

    constructor(path: string) {
        this.#path = path;
        this.#handle = fs.openSync(path, "w+");
        console.log(`file opened ${path}`);
    }

    [Symbol.dispose]() {// clean-up
        // Close the file and delete it.
        fs.closeSync(this.#handle);
        console.log(`file closed ${this.#path}`);
        //fs.unlinkSync(this.#path);
    }
}
