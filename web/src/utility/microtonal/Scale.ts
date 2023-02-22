import { CentNote } from "./notes/CentNote";
import { ScaleNote } from "./notes/ScaleNote";
import {RatioNote} from "./notes/RatioNote";

export class Scale {

    public title: string;
    public description: string;
    public notes: ScaleNote[];

    constructor(notes: ScaleNote[], title: string = '', description: string = '') {

        this.title = title;
        this.description = description;
        this.notes = notes;
    }
}

function scaleFromCents(centValues: Array<number>, title: string = '', description: string = '') {
    let notes = centValues.map(value => new CentNote(value));
    return new Scale(notes, title, description);
}

function scaleFromRatios(ratioValues: Array<string>, title: string = '', description: string = '') {
    let notes = ratioValues.map(value => new RatioNote(value));
    return new Scale(notes, title, description);
}


export { Scale, scaleFromRatios, scaleFromCents }
