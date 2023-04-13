// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote } from ".";

const twelfthRootOfTwo = Math.pow(2, 1/12);

export function calcCentsMultiplier(cents: number): number {
    return Math.pow(2, cents / 1200);
}

export function multiplierToCents(multiplier: number): string {
    if (multiplier <= 0)
        return '0.0';

    let cents: string = (1200 * Math.log2(multiplier)).toString();
    if (!cents.includes('.'))
        cents += '.0'

    return cents;
}

export class CentNote extends ScaleNote {
    public cents: number;

    constructor(cents: number | string, comments: string = '') {

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
        
        let multiplier: number = calcCentsMultiplier(cents);
        super(num, multiplier, comments);

        this.cents = cents;
    }

    exportScala(): string {
        let centsString = this.cents.toString();
        if (!centsString.includes('.'))
            centsString += '.0';

        return centsString + ' ' + this.comments;
    }

    static override average(note1: ScaleNote, note2: ScaleNote): CentNote {

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
