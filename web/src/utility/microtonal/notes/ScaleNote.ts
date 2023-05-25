import {RatioNote, CentNote} from ".";

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

    exportScala(): string {
        if (this.comments === '')
            return this.num;

        return this.num + ' ' + this.comments;
    }

    // Mainly used in tests currently.
    abstractEquals(note: ScaleNote): boolean {
        return (this.num === note.num && this.comments === note.comments);
    }

    equals(note: ScaleNote): boolean {
        return this.id === note.id;
    }

    static averageNotes(note1: ScaleNote, note2: ScaleNote): ScaleNote {
        if (note1 instanceof RatioNote && note2 instanceof RatioNote) {
            return RatioNote.averageNotes(note1, note2);
        }
        return CentNote.averageNotes(note1, note2);
    }

    // Convert a ratio value to a cent value always.
    // Only convert a cent value to a ratio value if
    // the cent value had been previously converted from a ratio.
    static convertNote(note: ScaleNote): string {
        if (note instanceof RatioNote)
            return RatioNote.convertToCents(note);
        else if (note instanceof CentNote)
            return CentNote.convertToRatio(note);
    }
}