import { RatioNote, CentNote } from ".";


// The ScaleNote class is the parent for all the note classes.
// This includes CentNote, IntRatioNote, and RatioNote.
// For consistency with Scala files, all notes containing
// a decimal place are cent notes, and notes without a decimal
// or containing a '/' are ratio notes.
export class ScaleNote {
    public num: string;
    public multiplier: number;
    public comments: string;

    constructor(num: string, multiplier: number, comments: string | null = null) {
        this.num = num;
        this.multiplier = multiplier;
        this.comments = comments;
    }

    exportScala(): string {
        throw new Error('Only call exportScala() from ScaleNote\'s subclasses');
    }

    static average(note1: ScaleNote, note2: ScaleNote): ScaleNote {
        if (note1 instanceof RatioNote && note2 instanceof RatioNote) {
            return RatioNote.average(note1, note2);
        }
        
        return CentNote.average(note1, note2);
    }
}
