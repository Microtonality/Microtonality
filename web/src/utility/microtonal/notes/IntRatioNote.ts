import { RatioNote } from ".";

// The IntRatioNote is a child of the RatioNote, and handles
// values without a '/'. This helps simplify the RatioNote class,
// as the value taken in by this class is converted to a proper ratio anyway.
export class IntRatioNote extends RatioNote {
    public intRatio: number;

    constructor(intRatio: number | string, comments: string | null = null) {
        super(intRatio.toString() + '/1', comments);

        this.intRatio = ((typeof intRatio === 'number') ? intRatio : parseInt(intRatio));
    }

    exportScala(): string {
        return this.intRatio + ' ' + this.comments;
    }
}
