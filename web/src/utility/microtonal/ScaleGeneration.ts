import {Scale, scaleFromCents} from "./Scale";
import {CentNote, RatioNote, ScaleNote} from "./notes";

// Since the scale is an interface but its fields contain classes,
// we have to be careful about setting a scale directly otherwise
// we risk losing the typing on the ScaleNote objects.
// This prevents null and undefined errors that will crash the site.
export function rebuildScale(scale: Scale): Scale {

    let notes: ScaleNote[] = [];
    let octaveNote: ScaleNote;

    let noteType: (typeof CentNote | typeof RatioNote) = null;

    for (let untypedNote of scale.notes) {
        noteType = (untypedNote.num.includes('.')) ? CentNote : RatioNote;
        notes.push(new noteType(untypedNote.num, untypedNote.comments));
    }

    noteType = (scale.octaveNote.num.includes('.')) ? CentNote : RatioNote;
    octaveNote = new noteType(scale.octaveNote.num, scale.octaveNote.comments);

    return {
        title: scale.title,
        description: scale.description,
        notes: notes,
        octaveNote: octaveNote
    } as Scale;
}

export function generateEqualTemperedScale(numberOfNotes: number): Scale {
    let cents: number[] = [];

    for (let i = 0; i < numberOfNotes; i++) {
        cents.push(1200 / numberOfNotes * i);
    }

    return scaleFromCents(cents, `${numberOfNotes}-TET`, `A ${numberOfNotes}-tone equal tempered scale.`);
}

const generateETScales = (): Scale[] => {
    let scales: Scale[] = [];
    for (let i = 12; i <= 32; i++)
        scales.push(generateEqualTemperedScale(i));

    return scales;
};

export const EQUAL_TEMPERED_SCALES: Scale[] = [...generateETScales()];