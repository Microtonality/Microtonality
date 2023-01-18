import { ScaleNote } from "./notes/ScaleNote";

export class Scale {

    public title: string;
    public description: string;
    public notes: ScaleNote[];

    constructor(title: string = "", description: string = "", notes: ScaleNote[]) {

        this.title = title;
        this.description = description;
        this.notes = notes;
    }
}
