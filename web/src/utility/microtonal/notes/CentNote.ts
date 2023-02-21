// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

const twelfthRootOfTwo = Math.pow(2, 1/12);

function calcCentsMultiplier(cents: number): number {
    return Math.pow(twelfthRootOfTwo, cents * 0.01);
}

export class CentNote extends ScaleNote {
    public cents: number;

    constructor(cents: number, comments: string | null = null) {
        // Has to be outside the class because we apparently
        // can't call class methods until we call super :(
        let multiplier = calcCentsMultiplier(cents);
        super(multiplier, comments);
        this.cents = cents;
    }

    // Do we need this?
    public static reverseCalc(multiplier: number): string {

        if (multiplier <= 0)
            throw new Error('CentNote.reverseCalc(' + multiplier + '): Multiplier must be higher than 0.');

        let cents: number = 1200 * Math.log2(multiplier);

        return cents.toString();
    }
}
