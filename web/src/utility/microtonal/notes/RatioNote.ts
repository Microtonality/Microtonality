// Some code adapted for our use case from https://github.com/snopeusz/scl_reader

import { ScaleNote } from "./ScaleNote";

export function calcRatioMultiplier(ratio: string): number {
    let ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
    let parsedRatio: string[] = ratioRegex.exec(ratio);

    let numerator: number = parseInt(parsedRatio[1]);
    let denominator: number = parseInt(parsedRatio[2]);

    if (denominator === 0)
        throw new InvalidRatioException(`The denominator is zero in the pitch value ${ratio}.`);

    return numerator / denominator;
}

export class RatioNote extends ScaleNote {
    public ratio: string;

    constructor(ratio: string, comments: string = '') {
        super(calcRatioMultiplier(ratio), comments);
        this.ratio = ratio;
    }

    exportScala(): string {
        return this.ratio + ' ' + this.comments;
    }
}

export class InvalidRatioException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}