// Some code adapted for our use case from https://github.com/snopeusz/scl_reader
// TODO: TEST

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

export class Cent extends ScaleNote {

    public multiplier: number;
    public num: string;
    public comments: string;

    constructor(_num: string, _comments: string) {

        super();

        this.multiplier = this.calcMultiplier(_num);
        this.num = _num;
        this.comments = _comments;
    }

    protected validateInput(num: string): number {
        
        var centRegex: RegExp = new RegExp(/(\d+\.\d+)/);
        var parsedCent: string[] = centRegex.exec(num);

        if (parsedCent === null)
            throw new InvalidNoteInputException('Cent.validateInput(' + num + '): parsedCent is null.');

        let cents: number = parseFloat(parsedCent[1]);

        if (isNaN(cents))
            throw new InvalidNoteInputException('Cent.validateInput(' + num + '): The string is not a number.');

        return cents;
    }

    protected calcMultiplier(num: string): number {

        let cents: number = this.validateInput(num);
        let twelfthRootOfTwo = Math.pow(2, 1/12);
        let multiplier: number = Math.pow(twelfthRootOfTwo, cents * 0.01);

        return multiplier;
    }
}
