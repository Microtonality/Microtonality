// The ScaleNote class is the parent for all the note classes.
// This includes CentNote, IntRatioNote, and RatioNote.
// For consistency with Scala files, all notes containing
// a decimal place are cent notes, and notes without a decimal
// or containing a '/' are ratio notes.
export class ScaleNote {
    public id: string;
    public num: string;
    public multiplier: number;
    public comments: string;

    constructor(num: string, multiplier: number, comments: string = '') {
        this.id = Math.random().toString().slice(2);
        this.num = num;
        this.multiplier = multiplier;
        this.comments = comments;
    }

    public exportScala(): string {
        if (this.comments === '')
            return this.num;

        return this.num + ' ' + this.comments;
    }

    // Mainly used in tests currently.
    public abstractEquals(note: ScaleNote): boolean {
        return (this.num === note.num && this.comments === note.comments);
    }

    public equals(note: ScaleNote): boolean {
        return this.id === note.id;
    }
}