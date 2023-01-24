// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

const twelfthRootOfTwo = Math.pow(2, 1/12);

export class CentNote extends ScaleNote {
    protected calcMultiplier(num: string): number {
        let cents: number = parseFloat(num);

        if (isNaN(cents))
            throw new InvalidNoteInputException('CentNote.calcMultiplier(' + num + '): The string is not a number.');

        return Math.pow(twelfthRootOfTwo, cents * 0.01);
    }

    public static reverseCalc(multiplier: number): string {

        if (multiplier <= 0)
            throw new Error('CentNote.reverseCalc(' + multiplier + '): Multiplier must be higher than 0.');

        let cents: number = 1200 * Math.log2(multiplier);

        return cents.toString();
    }
}
