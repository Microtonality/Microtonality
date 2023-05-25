// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import {CentNote, ScaleNote} from ".";
import {multiplierToCents} from "./CentNote";

// The RatioNote class contains all the notes with a '/'.
export class RatioNote extends ScaleNote {
    public ratio: string;

    constructor(ratio: string, comments: string = '') {
        if (!ratio.includes('/'))
            ratio += '/1';

        super(ratio, RatioNote.ratioToMultiplier(ratio), comments);
        this.ratio = ratio;
    }

    static ratioToMultiplier(ratio: string): number {
        let ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
        let parsedRatio: string[] = ratioRegex.exec(ratio);

        let numerator: number = parseInt(parsedRatio[1]);
        let denominator: number = parseInt(parsedRatio[2]);

        if (denominator === 0)
            throw new Error(DENOMINATOR_IS_ZERO_ERROR(ratio));

        return numerator / denominator;
    }

    static convertToCents(ratio: RatioNote): CentNote {
        let oldMultiplier: number = RatioNote.ratioToMultiplier(ratio.num);
        let cents: string = multiplierToCents(oldMultiplier);

        return new CentNote(cents, ratio.comments, ratio.num);
    }

    static averageNotes(ratio1: RatioNote, ratio2: RatioNote): RatioNote {

        let ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
        let parse1: string[] = ratioRegex.exec(ratio1.num);
        let parse2: string[] = ratioRegex.exec(ratio2.num);

        let numerator1: number = parseInt(parse1[1]);
        let denominator1: number = parseInt(parse1[2]);
        let numerator2: number = parseInt(parse2[1]);
        let denominator2: number = parseInt(parse2[2]);

        let addedNumerator: number;
        let addedDenominator: number = RatioNote.lcm(denominator1, denominator2);
        
        if (denominator1 !== addedDenominator) {
            numerator1 *= addedDenominator;
        }
        if (denominator2 !== addedDenominator) {
            numerator2 *= addedDenominator;
        }
        addedNumerator = numerator1 + numerator2;

        // 'divide' by 2
        addedDenominator *= 2;

        return new RatioNote(`${addedNumerator}/${addedDenominator}`);
    }

    // least common multiple
    private static lcm(a: number, b: number): number {
        return Math.abs((a * b) / RatioNote.gcd(a, b));
    }

    // greatest common denominator
    private static gcd(a: number, b: number): number {   
        a = Math.abs(a);
        b = Math.abs(b);
        while(b) {
          let t: number = b;
          b = a % b;
          a = t;
        }
        return a;
    }
}

export const DENOMINATOR_IS_ZERO_ERROR = (ratio: string): string => {
    return (
        `The denominator is zero in the pitch value ${ratio}.`
    );
};