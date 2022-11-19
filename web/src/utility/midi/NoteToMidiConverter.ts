// Some code adapted for our use case from https://github.com/kevinsqi/react-piano/blob/master/src/MidiNumbers.js

const NOTE_REGEX: RegExp = /([a-g])([#b]?)([-]?[0-9])/;
const MIDI_MIN: number = 0; // C-1
const MIDI_MAX: number = 128; // G#9
const NOTES_IN_OCTAVE: number = 12;

function NoteToMidi(note: string): number {

    const match: RegExpExecArray = NOTE_REGEX.exec(note.toLowerCase());

    if (!match)
        return -1;

    const [, letter, accidental, octave] = match;

    const pitch: string = `${letter.toUpperCase()}${accidental}`;
    const pitchIndex: number = PITCH_INDEXES[pitch];

    if (pitchIndex == null)
        return -1;

        const midiNum: number = pitchIndex + (NOTES_IN_OCTAVE * (parseInt(octave, 10) + 1));

    return midiNum;
}

function KeyToMidiConverter(key: string, octave: number): number {

    const offsetFromC = KEYBOARD_MAPPING[key];

    if (offsetFromC === undefined)
        return -1;

    const cIndexInOctave = (octave * NOTES_IN_OCTAVE) + NOTES_IN_OCTAVE;

    const midiNum: number = offsetFromC + cIndexInOctave;

    // console.log("key: " + midiNum);

    return midiNum;
}

type StringNumMap = {
    [key: string]: number;
}

const KEYBOARD_MAPPING: StringNumMap = {
    'a': 0,
    'w': 1,
    's': 2,
    'e': 3,
    'd': 4,
    'f': 5,
    't': 6,
    'g': 7,
    'y': 8,
    'h': 9,
    'u': 10,
    'j': 11,
    'k': 12,
    'o': 13,
    'l': 14,
    'p': 15,
    ';': 16,
    '\'': 17,
    ']': 18,
    '\\': 20
}

const PITCH_INDEXES: StringNumMap = {
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11,
};

export {
    NoteToMidi,
    KeyToMidiConverter,
    MIDI_MIN,
    MIDI_MAX
}
