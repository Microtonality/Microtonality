import {ScaleNote} from "./ScaleNote";

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
        
        super(num, CentNote.centsToMultiplier(cents), comments);
        this.cents = cents;
        this.prevRatio = prevRatio;
    }

    static centsToMultiplier(cents: number): number {
        return Math.pow(2, cents / 1200);
    }
}
