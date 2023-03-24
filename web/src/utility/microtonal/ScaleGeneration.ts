import {Scale, scaleFromCents, scaleFromRatios} from "./Scale";
import {CentNote} from "./notes/CentNote";

export function generateEqualTemperedScale(numberOfNotes: number): Scale {
    let cents = [];

    for (let i = 0; i < numberOfNotes; i++) {
        cents.push(1200 / numberOfNotes * i);
    }

    return scaleFromCents(cents, `${numberOfNotes}-note Equal Tempered Scale`);
}

export function frequencyToCents(tuningFrequency: number, otherFrequency: number) {
    return (1200 * Math.log2(otherFrequency / tuningFrequency));
}

export function frequenciesToScaleNote(tuningFrequency: number, notes: Array<number>): Array<CentNote> {
    let scaleNotes: Array<CentNote> = [];

    for (const note of notes) {
        scaleNotes.push(new CentNote(frequencyToCents(tuningFrequency, note)));
    }

    return scaleNotes;
}
