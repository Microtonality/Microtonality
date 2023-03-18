import { ScaleNote, CentNote, RatioNote } from "./notes";

export class Scale {
    public notes: ScaleNote[];
    public title: string;
    public description: string;
    public octaveNote: ScaleNote;

    constructor(notes: ScaleNote[], title: string = '', description: string = '', octaveNote: ScaleNote = null) {
        this.notes = notes;
        this.title = title;
        this.description = description;
        this.octaveNote = (octaveNote !== null) ? octaveNote : new RatioNote("2/1");
    }

    scaleDegreeToNote(scaleDegree: number): ScaleNote {
        return this.notes[scaleDegree % this.notes.length];
    }

    equals(other: Scale): boolean {
        if (this.notes.length !== other.notes.length)
            return false;

        let i: number;
        for (i = 0; i < this.notes.length; i++) {
            if (this.notes[i].num !== other.notes[i].num)
                return false;
        }

        if (this.octaveNote.num !== other.octaveNote.num ||
            this.title !== other.title ||
            this.description !== other.description) {
            return false;
        }

        return true;
    }
}

export function scaleFromCents(centValues: Array<number>, title: string = '', description: string = '') {
    let notes = centValues.map(value => new CentNote(value));
    return new Scale(notes, title, ((description) ? description : `Microtonal scale with ${centValues.length} notes as cent values`));
}

export function scaleFromRatios(ratioValues: Array<string>, title: string = '', description: string = '') {
    let notes = ratioValues.map(value => new RatioNote(value));
    return new Scale(notes, title, ((description) ? description : `Microtonal scale with ${ratioValues.length} notes as ratio values`));
}
