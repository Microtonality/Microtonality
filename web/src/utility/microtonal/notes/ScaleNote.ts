
export class ScaleNote {
    public multiplier: number;
    public comments: string;
    // public altered: boolean = false;

    // Subclass this, don't use as is
    constructor(multiplier: number, comments: string | null = null) {
        this.multiplier = multiplier;
        this.comments = comments;
        // this.altered = false;
    }

    exportScala(): string {
        return 'ScaleNote DONT CALL';
    }

    // We should probably just overwrite the 
    // note in the scale at the level of the
    // ScaleHandler upon changing the frequency.
    // Also we gotta remember to
    // bring any comments over from the old note.
    // public setAltered(altered: boolean) {
    //     this.altered = altered;
    // }
}
