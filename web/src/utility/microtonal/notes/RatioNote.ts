import {ScaleNote} from "./ScaleNote";

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
}

export const DENOMINATOR_IS_ZERO_ERROR = (ratio: string): string => {
    return (
        `The denominator is zero in the pitch value ${ratio}.`
    );
};