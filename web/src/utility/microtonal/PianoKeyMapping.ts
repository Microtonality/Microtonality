import {Scale} from "./Scale";
import {generateEqualTemperedScale} from "./ScaleGeneration";
import {KeyboardShortcuts} from "react-piano";

export interface KeyShortcut {
    key: string;
    midiNumber: number;
}

// Fits a given scale to the number of keys per octave
// Returns an array, mapping each index of a range 0-(keysPerOctave-1) to a scale degree of the given scale
export const mapScaleToKeys = (scale: Scale, keysPerOctave: number) : Record<number, number> => {
    // For the default mapping, we find the note closest to each note from the keysPerOctave-tone scale
    let defaultMultipliers = generateEqualTemperedScale(keysPerOctave).notes.map(note => note.multiplier);
    // We need to store the original index because we'll be deleting and reordering entries from this list,
    // so indexes will no longer line up correctly
    let scaleMultipliers = scale.notes.map(note => note.multiplier);
    // console.log("mapscale", defaultMultipliers, multipliers.slice());
    let mapping: Array<number> = [];

    // If the scale is smaller than the keyboard we are mapping it to, we need to search in the other direction
    // Swap the lists
    if (keysPerOctave > scale.notes.length) {
        let b = defaultMultipliers;
        defaultMultipliers = scaleMultipliers;
        scaleMultipliers = b;
    }

    let multipliers = scaleMultipliers.map((multiplier, i) => {return {multiplier: multiplier, originalIndex: i}});

    for (let originalMultiplier of defaultMultipliers) {
        if (multipliers.length === 0) {
            break;
        }
        // Sort multipliers, scoring them based on how close they are to our original multiplier
        multipliers = multipliers.sort((a, b) => {
            return Math.abs(originalMultiplier - a.multiplier) - Math.abs(originalMultiplier - b.multiplier);
        })
        // multipliers[0] is now the closest note, push it onto mapping
        // console.log(originalMultiplier, "is closest to", multipliers[0].multiplier)
        mapping.push(multipliers[0].originalIndex)
        // remove it from multipliers so we can't double assign it
        multipliers.splice(0, 1)
    }

    // Now convert the array to a record
    let finalMapping: Record<number, number> = {};

    // If we had to swap the lists, swap the numbers around when we make the mapping
    if (keysPerOctave > scale.notes.length) {
        for (let scaleDegree in mapping) {
            finalMapping[mapping[scaleDegree]] = Number(scaleDegree);
        }
    } else {
        for (let scaleDegree in mapping) {
            finalMapping[scaleDegree] = mapping[scaleDegree];
        }
    }

    return finalMapping;
}

// Map a given scale mapping of keysPerOctave to a scale to a given set of keys
export const mapScaleToKeyboardShortcuts = (scale: Scale, keysPerOctave: number) => {
    let keyMapping = mapScaleToKeys(scale, keysPerOctave);
    let keyLength = Object.keys(keyMapping).length;
    let finalMapping: Record<number, number> = {};
    for (let i=0; i<keysPerOctave; i++) {
        // console.log(i % keyMapping.length, keyMapping[i % keyMapping.length]);
        // Mod i so we wrap around in case we are going above an octave
        // Add an octave to the key number if we reach the next octave in mapping
        finalMapping[keyMapping[i % keyLength] + Math.floor(i / keyLength) * scale.notes.length] = i;
    }

    // console.log(keyMapping, finalMapping);
    return keyMapping;
}

export const createPianoKeyboardShortcuts = (rootKey: number, keysPerOctave: number): Array<KeyShortcut> => KeyboardShortcuts.create({
    firstNote: rootKey,
    lastNote: rootKey + keysPerOctave,
    keyboardConfig: KeyboardShortcuts.HOME_ROW
});
