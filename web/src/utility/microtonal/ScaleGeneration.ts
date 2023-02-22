import {ScaleNote} from "./notes/ScaleNote";
import {scaleFromCents} from "./Scale";
import {CentNote} from "./notes/CentNote";

export function generateEqualTemperedScale(numberOfNotes: number) {
    let multipliers = [];

    for (let i = 0; i < numberOfNotes; i++) {
        multipliers.push(i * 100);
    }

    return scaleFromCents(multipliers, `${numberOfNotes}-note Equal Tempered Scale`);
}

const logOf2 = Math.log(2)

export function frequencyToCents(tuningFrequency: number, otherFrequency: number) {
    return (1200 * Math.log(otherFrequency / tuningFrequency)) / logOf2;
}


export function frequenciesToScaleNote(tuningFrequency: number, notes: Array<number>) {
    let scaleNotes = [];

    for (const note of notes) {
        scaleNotes.push(new CentNote(frequencyToCents(tuningFrequency, note)))
    }

    return scaleNotes;
}