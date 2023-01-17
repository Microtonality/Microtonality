// Some code adapted for our use case from https://github.com/snopeusz/scl_reader
// TODO: TEST

import { ScaleNote, InvalidNoteInputException } from "./ScaleNote";

export class Ratio extends ScaleNote {

    public multiplier: number;
    public num: string;
    public comments: string;

    constructor(_num: string, _comments: string) {

        super();

        this.multiplier = this.calcMultiplier(_num);
        this.num = _num;
        this.comments = _comments;
    }

    protected validateInput(num: string): [number, number] {
        
        var ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
        var parsedRatio: string[] = ratioRegex.exec(num);

        if (parsedRatio === null)
            throw new InvalidNoteInputException('Ratio.validateInput(' + num + '): parsedRatio is null.');

        let numerator: number = parseInt(parsedRatio[1]);
        let denominator: number = parseInt(parsedRatio[2]);

        if (isNaN(numerator))
            throw new InvalidNoteInputException('Ratio.validateInput(' + num + '): The numerator is not a number.');
        if (isNaN(denominator))
            throw new InvalidNoteInputException('Ratio.validateInput(' + num + '): The denominator is not a number.');

        return [numerator, denominator];
    }

    protected calcMultiplier(num: string): number {

        let ratio: [number, number] = this.validateInput(num);
        let multiplier: number = ratio[0] / ratio[1];

        return multiplier;
    }
}
