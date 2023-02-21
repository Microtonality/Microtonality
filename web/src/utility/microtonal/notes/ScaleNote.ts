export class ScaleNote {
    public multiplier: number;
    public comments: string;
    public altered: boolean;

    // Subclass this, don't use as is
    constructor(multiplier: number, comments: string | null = null) {
        this.multiplier = multiplier;
        this.comments = comments;
        this.altered = false;
    }

    // Peter: What is this for?
    public setAltered(altered: boolean) {
        this.altered = altered;
    }
}

export class InvalidNoteInputException extends Error {

    constructor(msg: string) {
        super(msg);
    }
}
