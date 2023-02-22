import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";
import {RatioNote} from "./RatioNote";

export class IntRatioNote extends RatioNote {
    public intRatio: number
    constructor(intRatio: number, comments: string | null = null) {
        super(intRatio.toString() + "/1", comments);
        this.intRatio = intRatio;
    }
}
