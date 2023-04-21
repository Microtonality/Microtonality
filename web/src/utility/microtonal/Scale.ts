import { ScaleNote, CentNote, RatioNote } from "./notes";

// The Scale contains all the notes (starting with the 1/1)
// and some fields used by Scala files.
// Note: The octaveNote is not inside the notes array,
// since it more represents the start of the next octave
// rather than the end of our current octave.
export interface Scale {
    notes?: ScaleNote[],
    title?: string,
    description?: string,
    octaveNote?: ScaleNote
}

export const DEFAULT_SCALE: Scale = {
    notes: [],
    title: '',
    description: '',
    octaveNote: new RatioNote('2/1')
}

// Based off the scale degree, find which note we are currently using.
export function scaleDegreeToNote(scale: Scale, scaleDegree: number): ScaleNote {
    return scale.notes[scaleDegree % scale.notes.length];
}

// Given an array of cent values, create a scale.
export function scaleFromCents(centValues: Array<number>, title: string = '', description: string = '') {
    let notes = centValues.map(value => new CentNote(value));
    return {
        ...DEFAULT_SCALE,
        notes: notes,
        title: title,
        description: ((description) ?
            description : `Microtonal scale with ${centValues.length} notes as cent values`),
    } as Scale;}

// Given an array of ratio values, create a scale.
export function scaleFromRatios(ratioValues: Array<string>, title: string = '', description: string = '') {
    let notes = ratioValues.map(value => new RatioNote(value));
    return {
        ...DEFAULT_SCALE,
        notes: notes,
        title: title,
        description: ((description) ?
            description : `Microtonal scale with ${ratioValues.length} notes as ratio values`),
    } as Scale;
}
