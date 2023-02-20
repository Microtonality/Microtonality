import {ScaleNote} from "./notes/ScaleNote";

export function generateEqualTemperedScale(numberOfNotes: number) {
    let multipliers = [];

    for (let i = 0; i < numberOfNotes; i++) {
        multipliers.push((440 * Math.pow(2, i/12)) / 440);
    }

    return multipliers;
}

export function frequenciesToScaleNote(notes: Array<number>) {
    let scaleNotes = [];

    for (const note in notes) {
        scaleNotes.push(new ScaleNote(note))
    }

    return scaleNotes;
}