// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import {RatioNote, ScaleNote} from ".";

// The CentNote represents all note values with a decimal place.
// For more information on how the calculations here differ
// from ratios, see section 4.5.2 in the design document.
export class CentNote extends ScaleNote {
    public cents: number;

    // Placeholder in case this cent value
    // was calculated from a ratio.
    public prevRatio: string;

    constructor(cents: number | string, comments: string = '', prevRatio: string = '') {

        let num: string;
        if (typeof cents === 'string') {
            num = cents;
            cents = parseFloat(cents);
        }
        else {
            num = cents.toString();
        }

        if (!num.includes('.'))
            num += '.0';
        
        let multiplier: number = CentNote.centsToMultiplier(cents);
        super(num, multiplier, comments);

        this.cents = cents;
        this.prevRatio = prevRatio;
    }

    static centsToMultiplier(cents: number): number {
        return Math.pow(2, cents / 1200);
    }

    static convertToRatio(cents: CentNote): RatioNote {
        if (cents.prevRatio === '')
            return new RatioNote('1/1', cents.comments);

        return new RatioNote(cents.prevRatio, cents.comments);
    }

    static averageNotes(note1: ScaleNote, note2: ScaleNote): CentNote {

        let averaged: CentNote;
        let tempNote: CentNote;

        if (note1 instanceof CentNote && note2 instanceof CentNote) {
            averaged = new CentNote((note1.cents + note2.cents) / 2);
        }
        else if (note1 instanceof CentNote) {
            tempNote = new CentNote(multiplierToCents(note2.multiplier));
            averaged = new CentNote((note1.cents + tempNote.cents) / 2);
        }
        else if (note2 instanceof CentNote) {
            tempNote = new CentNote(multiplierToCents(note1.multiplier));
            averaged = new CentNote((tempNote.cents + note2.cents) / 2);
        }

        return averaged;
    }
}

export function multiplierToCents(multiplier: number): string {
    if (multiplier <= 1)
        return '0.0';

    let cents: string = (1200 * Math.log2(multiplier)).toString();
    if (!cents.includes('.'))
        cents += '.0'

    return cents;
}
