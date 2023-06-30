import { v4 as UUIDv4 } from 'uuid';

// The ScaleNote class is the parent for the CentNote and RatioNote classes.
// For consistency with Scala files, all notes containing
// a decimal place are cent notes, and notes without a decimal
// or containing a '/' are ratio notes.
export class ScaleNote {
    public id: string;
    public num: string;
    public multiplier: number;
    public comments: string;

    constructor(num: string, multiplier: number, comments: string = '') {
        this.id = UUIDv4();
        this.num = num;
        this.multiplier = multiplier;
        this.comments = comments;
    }

    public exportScala(): string {
        if (this.comments === '')
            return this.num;

        return this.num + ' ' + this.comments;
    }

    public abstractEquals(note: ScaleNote): boolean {
        if (this.multiplier === 1 &&
            this.multiplier === note.multiplier &&
            this.comments === note.comments) {

            return true;
        }

        return (this.num === note.num && this.comments === note.comments);
    }

    public equals(note: ScaleNote): boolean {
        return this.id === note.id;
    }
}