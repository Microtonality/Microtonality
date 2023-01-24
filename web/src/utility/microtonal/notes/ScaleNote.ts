export class ScaleNote {

    public multiplier: number;
    public num: string;
    public comments: string;
    public altered: boolean;

    constructor(num: string, comments: string | null = null) {
        this.multiplier = this.calcMultiplier(num);
        this.num = num;
        this.comments = comments;
        this.altered = false;
    }

    protected calcMultiplier(num: string): number {
        throw new Error("Not implemented.");
    }

    public setAltered(altered: boolean) {
        this.altered = altered;
    }
}

export class InvalidNoteInputException extends Error {

    constructor(msg: string) {
        super(msg);
    }
}
