import { NoteToMIDI, MIDI_MIN, MIDI_MAX } from "../NoteToMIDI";


test('NoteToMIDI parses all notes correctly', () => {

    // Arrange, Act, and Assert
    let i: number;
    for (i = -1; i <= 128; i++) {

        if (i < 0)
            i += 12;

        // create note
        let pitch: string = REVERSE_PITCH_INDEXES[(i % 12)];
        let octave: number = Math.trunc(i / 12) - 1;
        let note: string = pitch + octave.toString();

        // convert
        let midi: number = NoteToMIDI(note);

        if (i < MIDI_MIN)
            expect(midi).toEqual(MIDI_MIN);
        else if (i > MIDI_MAX)
            expect(midi).toEqual(MIDI_MAX);
        else
            expect(midi).toEqual(i);
    }
})

test('NoteToMIDI throws Error if note is an incorrect format', () => {

    // Arrange
    let note: string = 'invalid';

    // Act and Assert
    expect(() => NoteToMIDI(note)).toThrowError();
})

type ReversePitchMap = {
    [key: number]: string;
}

let REVERSE_PITCH_INDEXES: ReversePitchMap = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'Eb',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'Ab',
    9: 'A',
    10: 'A#',
    11: 'B',
};