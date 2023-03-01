import { RatioNote } from "./RatioNote";

export class IntRatioNote extends RatioNote {
    public intRatio: number; // seems redundant but it is consistent

    constructor(intRatio: number | string, comments: string | null = null) {
        super(intRatio.toString() + '/1', comments);

        this.intRatio = ((typeof intRatio === 'number') ? intRatio : parseInt(intRatio));
    }

    exportScala(): string {
        return this.intRatio + ' ' + this.comments;
    }
}
