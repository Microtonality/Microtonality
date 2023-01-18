// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

export class RatioNote extends ScaleNote {
    protected calcMultiplier(num: string): number {
        const ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
        const parsedRatio: string[] = ratioRegex.exec(num);

        if (parsedRatio === null)
            throw new InvalidNoteInputException('RatioNote.calcMultiplier(' + num + '): parsedRatio is null.');

        let numerator: number = parseInt(parsedRatio[1]);
        let denominator: number = parseInt(parsedRatio[2]);

        if (isNaN(numerator))
            throw new InvalidNoteInputException('RatioNote.calcMultiplier(' + num + '): The numerator is not a number.');
        if (isNaN(denominator))
            throw new InvalidNoteInputException('RatioNote.calcMultiplier(' + num + '): The denominator is not a number.');
        if (denominator === 0)
            throw new InvalidNoteInputException('RatioNote.calcMultiplier(' + num + '): You cannot have 0 for the denominator in a pitch value.');

        return numerator / denominator;
    }
}
