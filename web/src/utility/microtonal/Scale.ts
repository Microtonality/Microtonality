import { ScaleNote, CentNote, RatioNote } from "./notes";
import {BaseRatioNote} from "./notes/RatioNote";

// The Scale contains all the notes (starting with the 1/1)
// and some fields used by Scala files.
// Note: The octaveNote is not inside the notes array.
export interface Scale {
    notes?: ScaleNote[],
    title?: string,
    description?: string,
    octaveNote?: ScaleNote
}

export const DEFAULT_SCALE: Scale = {
    notes: [BaseRatioNote],
    title: '',
    description: '',
    octaveNote: new RatioNote('2/1')
};

export function scaleAbstractEquals(scale1: Scale, scale2: Scale): boolean {
    if (scale1.title !== scale2.title ||
        scale1.description !== scale2.description ||
        scale1.notes.length !== scale2.notes.length ||
        !scale1.octaveNote.abstractEquals(scale2.octaveNote)) {

        return false;
    }

    for (let i = 0; i < scale1.notes.length; i++) {
        if (!scale1.notes.at(i).abstractEquals(scale2.notes.at(i)))
            return false;
    }

    return true;
}

// Based off the scale degree, find which note we are currently using.
export function scaleDegreeToNote(scale: Scale, scaleDegree: number): ScaleNote {
    return scale.notes[scaleDegree % scale.notes.length];
}

// Given an array of cent values, create a scale.
export function scaleFromCents(centValues: Array<number>, title: string = '', description: string = ''): Scale {
    let notes: CentNote[] = centValues.map((value: number) => new CentNote(value));
    return {
        ...DEFAULT_SCALE,
        notes: notes,
        title: title,
        description: description
    } as Scale;
}