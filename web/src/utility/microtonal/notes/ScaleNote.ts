export abstract class ScaleNote {

    public multiplier: number;
    public num: string;
    public comments: string;

    constructor(num: string, comments: string | null = null) {
        this.multiplier = this.calcMultiplier(num);
        this.num = num;
        this.comments = comments;
    }

    protected calcMultiplier(num: string): number {
        throw new Error("Not implemented")
    }
}

export class InvalidNoteInputException extends Error {

    constructor(msg: string) {
        super(msg);
    }
}
