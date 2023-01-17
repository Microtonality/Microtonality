import { ScaleNote } from "./notes/ScaleNote";

export class Scale {

    public title: string;
    public description: string;

    public notes: ScaleNote[];

    constructor(_title: string = "", _description: string = "", _notes: ScaleNote[]) {

        this.title = _title;
        this.description = _description;
        this.notes = _notes;
    }
}
