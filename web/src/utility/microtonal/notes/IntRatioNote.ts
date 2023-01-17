// Some code adapted for our use case from https://github.com/snopeusz/scl_reader
// TODO: TEST

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

export class IntRatioNote extends ScaleNote {
    protected calcMultiplier(num: string): number {

        var intRegex: RegExp = new RegExp(/(\d+)/);
        var parsedInt: string[] = intRegex.exec(num);

        if (parsedInt === null)
            throw new InvalidNoteInputException('IntRatio.validateInput(' + num + '): parsedInt is null.');

        let ratio: number = parseInt(parsedInt[1]);

        if (isNaN(ratio))
            throw new InvalidNoteInputException('IntRatio.validateInput(' + num + '): The string is not a number.');

        return ratio;
    }
}
