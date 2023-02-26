import { scaleFromCents } from "./Scale";
import {CentNote} from "./notes/CentNote";

export function generateEqualTemperedScale(numberOfNotes: number) {
    let multipliers = [];

    for (let i = 0; i < numberOfNotes; i++) {
        multipliers.push(i * 100);
    }

    return scaleFromCents(multipliers, `${numberOfNotes}-note Equal Tempered Scale`);
}

export function frequencyToCents(tuningFrequency: number, otherFrequency: number) {
    return (1200 * Math.log2(otherFrequency / tuningFrequency));
}

// TODO keep an eye out for where this is called
export function frequenciesToScaleNote(tuningFrequency: number, notes: Array<number>): Array<CentNote> {
    let scaleNotes: Array<CentNote> = [];

    for (const note of notes) {
        scaleNotes.push(new CentNote(frequencyToCents(tuningFrequency, note)))
    }

    return scaleNotes;
}