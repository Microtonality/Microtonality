import { RatioNote } from ".";

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
