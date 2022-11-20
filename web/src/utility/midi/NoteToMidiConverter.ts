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

function NotesFromOctave(octave: number): {[key: string]: number} {
    let firstNoteVal: number = NoteToMidi('c' + octave);
    let lastNoteVal: number = NoteToMidi('b' + octave);
    let firstHiddenNoteVal: number = NoteToMidi('c' + (octave + 1));
    let lastHiddenNoteVal: number = NoteToMidi('f' + (octave + 1))

    return {
        'firstNote': firstNoteVal,
        'lastNote': lastNoteVal,
        'firstHiddenNote': firstHiddenNoteVal,
        'lastHiddenNote': lastHiddenNoteVal
    }
}

type PitchMap = {
    [key: string]: number;
}

const PITCH_INDEXES: PitchMap = {
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
    NotesFromOctave,
    MIDI_MIN,
    MIDI_MAX
}
