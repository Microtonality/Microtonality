// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote } from "./ScaleNote";

const twelfthRootOfTwo = Math.pow(2, 1/12);

export function calcCentsMultiplier(cents: number): number {
    return Math.pow(twelfthRootOfTwo, cents * 0.01);
}

export class CentNote extends ScaleNote {
    public cents: number;

    constructor(cents: number | string, comments: string = '') {

        if (typeof cents === 'string')
            cents = parseFloat(cents);
        
        let multiplier: number = calcCentsMultiplier(cents);
        super(multiplier, comments);

        this.cents = cents;
    }

    exportScala(): string {
        let centsString = this.cents.toString();
        if (!centsString.includes('.'))
            centsString += '.0';

        return centsString + ' ' + this.comments;
    }
}
