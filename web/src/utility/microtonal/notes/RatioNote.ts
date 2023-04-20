// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote } from ".";

// The RatioNote class contains all the notes with a '/'.
export class RatioNote extends ScaleNote {
    public ratio: string;

    constructor(ratio: string, comments: string = '') {
        super(ratio, calcRatioMultiplier(ratio), comments);
        this.ratio = ratio;
    }

    exportScala(): string {
        return this.ratio + ' ' + this.comments;
    }
    
    static override average(ratio1: RatioNote, ratio2: RatioNote): RatioNote {

        // parse both ratios
        let ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
        let parse1: string[] = ratioRegex.exec(ratio1.num);
        let parse2: string[] = ratioRegex.exec(ratio2.num);

        let numerator1: number = parseInt(parse1[1]);
        let denominator1: number = parseInt(parse1[2]);
        let numerator2: number = parseInt(parse2[1]);
        let denominator2: number = parseInt(parse2[2]);

        // add the ratios
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
          var t = b;
          b = a % b;
          a = t;
        }
        return a;
    }
}

export function calcRatioMultiplier(ratio: string): number {
    let ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
    let parsedRatio: string[] = ratioRegex.exec(ratio);

    let numerator: number = parseInt(parsedRatio[1]);
    let denominator: number = parseInt(parsedRatio[2]);

    if (denominator === 0)
        throw new InvalidRatioException(`The denominator is zero in the pitch value ${ratio}.`);

    return numerator / denominator;
}

export class InvalidRatioException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}