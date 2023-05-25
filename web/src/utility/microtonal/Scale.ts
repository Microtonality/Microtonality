import { ScaleNote, CentNote, RatioNote } from "./notes";
import {generateEqualTemperedScale} from "./ScaleGeneration";
import {etSliderMin, etSliderMax} from "../../pages/play/settings panel/basic settings/EqualTemperedScaleSlider";

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
    notes: [new RatioNote('1/1')],
    title: '',
    description: '',
    octaveNote: new RatioNote('2/1')
};

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
    } as Scale;
}

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

const generateETScales = (): Scale[] => {
    let scales: Scale[] = [];
    for (let i = etSliderMin; i <= etSliderMax; i++)
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