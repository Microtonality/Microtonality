import {Scale, scaleFromCents} from "./Scale";

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