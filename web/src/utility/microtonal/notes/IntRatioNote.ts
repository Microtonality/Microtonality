// TODO: TEST

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

export class IntRatioNote extends ScaleNote {
    protected calcMultiplier(num: string): number {
        let ratio: number = parseInt(num);

        if (isNaN(ratio))
            throw new InvalidNoteInputException('IntRatioNote.calcMultiplier(' + num + '): The string is not a number.');

        return ratio;
    }
}
