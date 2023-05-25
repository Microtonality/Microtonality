import {Scale, scaleFromCents} from "./Scale";
import {CentNote} from "./notes";

export function generateEqualTemperedScale(numberOfNotes: number): Scale {
    let cents: number[] = [];

    for (let i = 0; i < numberOfNotes; i++) {
        cents.push(1200 / numberOfNotes * i);
    }

    return scaleFromCents(cents, `${numberOfNotes}-note Equal Tempered Scale`);
}

const generateETScales = (): Scale[] => {
    let scales: Scale[] = [];
    for (let i = 12; i <= 32; i++)
        scales.push(generateEqualTemperedScale(i));

    return scales;
};

export const EQUAL_TEMPERED_SCALES: Scale[] = [...generateETScales()];

export const matchesEqualTemperedScale = (scale: Scale): boolean => {

    let etScale: Scale;
    for (etScale of EQUAL_TEMPERED_SCALES) {
        if (scale.notes.length !== etScale.notes.length)
            continue;

        let earlyExit: boolean = false;
        for (let i = 0; i < scale.notes.length; i++) {
            if (scale.notes.at(i).num !== etScale.notes.at(i).num) {
                earlyExit = true;
                break;
            }
        }

        if (earlyExit || scale.octaveNote.num !== etScale.octaveNote.num)
            continue;

        return true;
    }

    return false;
};

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
