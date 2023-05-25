import {ScaleNote} from "./ScaleNote";
import {RatioNote} from "./RatioNote";
import {CentNote} from "./CentNote";


export const averageNotes = (note1: ScaleNote, note2: ScaleNote): ScaleNote => {
    if (note1 instanceof RatioNote && note2 instanceof RatioNote) {
        return averageRatios(note1, note2);
    }
    return averageOtherNotes(note1, note2);
}

// Convert a ratio value to a cent value always.
// Only convert a cent value to a ratio value if
// the cent value had been previously converted from a ratio.
export const convertNote = (note: ScaleNote): ScaleNote => {
    if (note instanceof RatioNote)
        return new CentNote(ratioToCent(note), note.comments, note.num);
    else if (note instanceof CentNote)
        return new RatioNote(centToRatio(note), note.comments);
}

const ratioToCent = (ratio: RatioNote): string => {
    return multiplierToCents(ratio.multiplier);
}

const centToRatio = (cent: CentNote): string => {
    return (cent.prevRatio) ? cent.prevRatio : '1/1';
}

export function multiplierToCents(multiplier: number): string {
    if (multiplier <= 1)
        return '0.0';

    let cents: string = (1200 * Math.log2(multiplier)).toString();
    if (!cents.includes('.'))
        cents += '.0'

    return cents;
}

const averageRatios = (ratio1: RatioNote, ratio2: RatioNote): RatioNote => {

    let ratioRegex: RegExp = new RegExp(/(\d+)\/(\d+)/);
    let parse1: string[] = ratioRegex.exec(ratio1.num);
    let parse2: string[] = ratioRegex.exec(ratio2.num);

    let numerator1: number = parseInt(parse1[1]);
    let denominator1: number = parseInt(parse1[2]);
    let numerator2: number = parseInt(parse2[1]);
    let denominator2: number = parseInt(parse2[2]);

    let addedNumerator: number;
    let addedDenominator: number = lcm(denominator1, denominator2);

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

const averageOtherNotes = (note1: ScaleNote, note2: ScaleNote): CentNote => {

    let averaged: CentNote;
    let tempNote: CentNote;

    if (note1 instanceof CentNote && note2 instanceof CentNote) {
        averaged = new CentNote((note1.cents + note2.cents) / 2);
    }
    else if (note1 instanceof CentNote && note2 instanceof RatioNote) {
        tempNote = new CentNote(ratioToCent(note2));
        averaged = new CentNote((note1.cents + tempNote.cents) / 2);
    }
    else if (note1 instanceof RatioNote && note2 instanceof CentNote) {
        tempNote = new CentNote(ratioToCent(note1));
        averaged = new CentNote((tempNote.cents + note2.cents) / 2);
    }

    return averaged;
}

// least common multiple
const lcm = (a: number, b: number): number => {
    return Math.abs((a * b) / gcd(a, b));
}

// greatest common denominator
const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while(b) {
        let t: number = b;
        b = a % b;
        a = t;
    }
    return a;
}