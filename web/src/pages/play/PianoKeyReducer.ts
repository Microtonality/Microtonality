import {MicrotonalConfig} from "../../utility/MicrotonalConfig";

export enum OctaveAction {
    INCREASE_OCTAVE,
    DECREASE_OCTAVE,
    SET_MICROTONAL_CONFIG
}

const KEYBOARD_SETTINGS = {
    minimumKeyboardLength: 14,
    maximumKeyboardLength: 14
}

const MIDI_MIN = 21;
const MIDI_MAX = 127;

type Action =
    | { type: OctaveAction.INCREASE_OCTAVE }
    | { type: OctaveAction.DECREASE_OCTAVE }
    | { type: OctaveAction.SET_MICROTONAL_CONFIG, config: MicrotonalConfig }

function getLowHighMidi(keysPerOctave: number, rootKey: number, octave: number, keyOffset: number, keyboardLength: number) {
    let lowestMidiNote = rootKey + keysPerOctave * octave + keyOffset;
    let highestMidiNote = lowestMidiNote + keyboardLength;
    return [lowestMidiNote, highestMidiNote]
}

function getKeyboardLength(keysPerOctave: number) {
    return Math.min(Math.max(KEYBOARD_SETTINGS.minimumKeyboardLength, keysPerOctave), KEYBOARD_SETTINGS.maximumKeyboardLength);
}

export interface OctaveOffset {
    octave: number, // How many octaves we offset from the root note?
    keyOffset: number,  // How many keys above to move the keyboard? The totalled number
    keysPerOctave: number,  // How many piano keys are mapped per octave?
    keyboardLength: number, // How many piano keys to display on screen?
    rootKey: number,    // The root key the tuning frequency is mapped to
    userKeyOffset: number,      // The key offset as configured by the user
}

export function initializeOctaveOffset(config: MicrotonalConfig) {
    return {
        octave: 0,
        keyOffset: 0,
        keysPerOctave: config.scaleConfig.keysPerOctave,
        rootKey: config.scaleConfig.rootKey,
        userKeyOffset: 0,
        keyboardLength: getKeyboardLength(config.scaleConfig.keysPerOctave)
    } as OctaveOffset;
}

export function OctaveOffsetReducer(state: OctaveOffset, action: Action) {
    let octave = state.octave;
    let userKeyOffset = state.userKeyOffset;
    let rootKey = state.rootKey;
    let keysPerOctave = state.keysPerOctave;
    switch (action.type) {
        case OctaveAction.INCREASE_OCTAVE:
            octave += 1;
            break;
        case OctaveAction.DECREASE_OCTAVE:
            octave -= 1;
            break;
        case OctaveAction.SET_MICROTONAL_CONFIG:
            rootKey = action.config.scaleConfig.rootKey;
            keysPerOctave = action.config.scaleConfig.keysPerOctave;
            break;
    }

    let keyboardLength = getKeyboardLength(keysPerOctave);
    let [lowestMidiNote, highestMidiNote] = getLowHighMidi(keysPerOctave, rootKey, octave, userKeyOffset, keyboardLength);

    if (lowestMidiNote <= (MIDI_MIN - keysPerOctave)) {
        octave += 1
    }
    if (highestMidiNote >= (MIDI_MAX + keysPerOctave)) {
        octave -= 1
    }

    [lowestMidiNote, highestMidiNote] = getLowHighMidi(keysPerOctave, rootKey, octave, userKeyOffset, keyboardLength);

    let safetyKeyOffset = 0;
    if (lowestMidiNote < MIDI_MIN) {
        safetyKeyOffset += MIDI_MIN - lowestMidiNote
    }
    if (highestMidiNote > MIDI_MAX) {
        keyboardLength -= highestMidiNote - MIDI_MAX
    }

    return {
        octave: octave,
        keyOffset: userKeyOffset + safetyKeyOffset,
        rootKey: rootKey,
        keysPerOctave: keysPerOctave,
        userKeyOffset: userKeyOffset,
        keyboardLength: keyboardLength
    } as OctaveOffset;
}