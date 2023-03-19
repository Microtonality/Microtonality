import { ScaleNote, CentNote, RatioNote } from "./notes";

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

export function scaleDegreeToNote(scale: Scale, scaleDegree: number): ScaleNote {
    return scale.notes[scaleDegree % scale.notes.length];
}

export function scaleFromCents(centValues: Array<number>, title: string = '', description: string = '') {
    let notes = centValues.map(value => new CentNote(value));
    return {
        ...DEFAULT_SCALE,
        notes: notes,
        title: title,
        description: ((description) ?
            description : `Microtonal scale with ${centValues.length} notes as cent values`),
    } as Scale;}

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
