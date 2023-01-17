export abstract class ScaleNote {

    public abstract multiplier: number;
    public abstract num: string;
    public abstract comments: string;

    protected abstract validateInput(num: string): any;
    protected abstract calcMultiplier(num: string): number;
}

export class InvalidNoteInputException extends Error {

    constructor(msg: string) {
        super(msg);
    }
}
