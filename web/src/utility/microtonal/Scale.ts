import { CentNote } from "./notes/CentNote";
import { ScaleNote } from "./notes/ScaleNote";

export class Scale {

    public title: string;
    public description: string;
    public notes: ScaleNote[];

    constructor(title: string = '', description: string = '', notes: ScaleNote[]) {

        this.title = title;
        this.description = description;
        this.notes = notes;
    }

    public regenerateScale(multipliers: number[]): ScaleNote[] {

        let i: number;
        for (i = 0; i < this.notes.length; i++)
            if (this.notes[i].altered)
                this.notes[i] = new CentNote(CentNote.reverseCalc(multipliers[i]), this.notes[i].comments);

        return this.notes;
    }
}
