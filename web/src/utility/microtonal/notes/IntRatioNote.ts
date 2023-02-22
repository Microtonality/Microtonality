import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";
import {RatioNote} from "./RatioNote";

export class IntRatioNote extends RatioNote {
    constructor(ratio: string, comments: string | null = null) {
        super(ratio + "/1", comments);
    }
}
