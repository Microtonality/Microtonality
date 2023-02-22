import {ScaleNote} from "./notes/ScaleNote";
import {scaleFromCents} from "./Scale";

export function generateEqualTemperedScale(numberOfNotes: number) {
    let multipliers = [];

    for (let i = 0; i < numberOfNotes; i++) {
        multipliers.push(i * 100);
    }

    return scaleFromCents(multipliers, `${numberOfNotes}-note Equal Tempered Scale`);
}

export function frequenciesToScaleNote(notes: Array<number>) {
    let scaleNotes = [];

    for (const note of notes) {
        scaleNotes.push(new ScaleNote(note))
    }

    return scaleNotes;
}