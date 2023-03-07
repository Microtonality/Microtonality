import { RatioNote, CentNote } from ".";

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
