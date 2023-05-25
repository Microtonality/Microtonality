import {Scale, scaleFromCents} from "./Scale";
import {CentNote} from "./notes";

export function generateEqualTemperedScale(numberOfNotes: number): Scale {
    let cents: number[] = [];

    for (let i = 0; i < numberOfNotes; i++) {
        cents.push(1200 / numberOfNotes * i);
    }

    return scaleFromCents(cents, `${numberOfNotes}-note Equal Tempered Scale`);
}

export function frequencyToCents(noteFrequency: number, tuningFrequency: number) {
    return (1200 * Math.log2(noteFrequency / tuningFrequency));
}

export function frequenciesToScaleNote(tuningFrequency: number, notes: Array<number>): Array<CentNote> {
    let scaleNotes: Array<CentNote> = [];

    for (const note of notes) {
        scaleNotes.push(new CentNote(frequencyToCents(note, tuningFrequency)));
    }

    return scaleNotes;
}
