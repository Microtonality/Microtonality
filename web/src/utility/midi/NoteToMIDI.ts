// Some code adapted for our use case from https://github.com/kevinsqi/react-piano/blob/master/src/MidiNumbers.js

export const MIDI_MIN: number = 0; // C-1
export const MIDI_MAX: number = 127; // G9

// Maps a note such as 'c#2' to a MIDI number.
export function NoteToMIDI(note: string): number {

    let noteRegex: RegExp = /([A-Ga-g])([#b]?)([-]?[0-9]+)/;
    let parsedNote: RegExpExecArray = noteRegex.exec(note);

    if (!parsedNote)
        throw Error(`Could not parse note: \'${note}\'`);

    let [, letter, accidental, octave] = parsedNote;

    let pitch: string = `${letter.toUpperCase()}${accidental}`;
    let pitchIndex: number = PITCH_INDEXES[pitch];

    // Offset the octave by one because C-1 has a MIDI number of 0.
    let midi: number = pitchIndex + ((parseInt(octave) + 1) * 12);

    return clampMIDI(midi);
}

function clampMIDI(midi: number): number {
    return Math.min(Math.max(midi, MIDI_MIN), MIDI_MAX);
}

type PitchMap = {
    [key: string]: number;
}

let PITCH_INDEXES: PitchMap = {
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
