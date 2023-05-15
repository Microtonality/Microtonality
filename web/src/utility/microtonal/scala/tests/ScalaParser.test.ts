import {DEFAULT_SCALE, Scale} from '../../Scale';
import {ScaleNote, CentNote, RatioNote, IntRatioNote} from '../../notes';
import {
    parseScalaFile,
    parsePitchValue,
    INCORRECT_KEYS_PER_OCTAVE_ERROR,
    NOT_ENOUGH_PITCH_VALUES_ERROR,
    INCORRECT_PITCH_VALUE_ERROR,
    COMMENT_BEFORE_PITCH_VALUE_ERROR,
} from '../ScalaParser';

let title: string;
let description: string;
let baseNote: ScaleNote;
let noteComment: string;
let messyNoteComment: string;

beforeAll(() => {
    title = 'title';
    description = 'description';
    baseNote = new RatioNote('1/1');
    noteComment = 'note comment';

    // This value hopefully covers all edge cases
    // in case regex use is to be explored.
    messyNoteComment = 'commentv2.3 9.5/10';
});

test('ScalaParser.parseScalaFile(string) parses a valid Scala file and contains the correct values.', () => {

    // Arrange
    // Create expected scale.
    let expTitle: string = title;
    let expDescription: string = description;

    // Notes
    let centNote: CentNote = new CentNote(RANDOM_CENTS(), noteComment);
    let ratioNote: RatioNote = new RatioNote(RANDOM_RATIO(), noteComment);
    let intRatioNote: IntRatioNote = new IntRatioNote(RANDOM_INT_RATIO(), noteComment);
    let expNotes: ScaleNote[] = [
        centNote,
        ratioNote,
        intRatioNote
    ];
    let octaveNote: RatioNote = new RatioNote(RANDOM_RATIO(), noteComment);

    let expectedScale: Scale = {
        notes: [baseNote, ...expNotes],
        title: expTitle,
        description: expDescription,
        octaveNote: octaveNote
    };

    // Create Scala file to test on.
    // For more information on the structure of Scala files,
    // refer to https://huygens-fokker.org/scala/scl_format.html.
    let file: string =
        `! ${expTitle}.scl\n` +
        `!\n` +
        `${expDescription}\n` +
        ` ${expNotes.length + 1}\n` +
        `!\n` +
        ` ${centNote.num} ${centNote.comments}\n` +
        ` ${ratioNote.num} ${ratioNote.comments}\n` +
        ` ${intRatioNote.multiplier.toString()} ${intRatioNote.comments}\n` +
        ` ${octaveNote.num} ${octaveNote.comments}\n`;

    // Act
    let scale: Scale = parseScalaFile(file);

    // Assert
    expect(scale).toEqual(expectedScale);
});

test('ScalaParser.parseScalaFile(string) doesn\'t save extra pitch values.', () => {

    // Arrange
    let validNote: ScaleNote = new CentNote(RANDOM_CENTS(), noteComment);
    let invalidNote: ScaleNote = new CentNote(RANDOM_CENTS(), 'invalid');
    let expectedScale: Scale = {...DEFAULT_SCALE, octaveNote: validNote};

    let file: string =
        `\n` +
        ` 1\n` +
        `!\n` +
        ` ${validNote.num} ${validNote.comments}\n` +
        ` ${invalidNote.num} ${invalidNote.comments}\n`;

    // Act
    let scale: Scale = parseScalaFile(file);

    // Assert
    expect(scale).toEqual(expectedScale);
});

test('ScalaParser.parseScalaFile(string) returns INCORRECT_KEYS_PER_OCTAVE_ERROR message if the number of keys per octave is not an integer.', () => {

    // Arrange
    let incorrectKeysPerOctave: string = `a2`;

    let file: string =
        `\n` +
        ` ${incorrectKeysPerOctave}\n` +
        `!\n` +
        ` 0.0 (we shouldn't get to this value in parseScalaFile(file))\n`;

    // Line number in 'file' variable above. (Indexed at 1)
    let lineNum: number = 2;

    let expErrorMsg: string = INCORRECT_KEYS_PER_OCTAVE_ERROR(lineNum);

    // Act and Assert
    expect(() => parseScalaFile(file)).toThrowError(expErrorMsg);
});

test('ScalaParser.parseScalaFile(string) returns NOT_ENOUGH_PITCH_VALUES_ERROR message if there are not enough pitch values.', () => {
    
    // Arrange
    let keysPerOctave: number = 2;
    let notes: ScaleNote[] = [new IntRatioNote('1')];

    let file: string =
        `\n` +
        ` ${keysPerOctave}\n` +
        `!\n` +
        ` ${notes.at(0).num}\n`;

    let expErrorMsg: string = NOT_ENOUGH_PITCH_VALUES_ERROR(keysPerOctave, notes.length);

    // Act and Assert
    expect(() => parseScalaFile(file)).toThrowError(expErrorMsg);
});








test('ScalaParser.parsePitchValue(string) builds CentNote.', () => {

    // Arrange
    let expectedNote: CentNote = new CentNote(RANDOM_CENTS(), messyNoteComment);
    let pitchValueLine: string = `${expectedNote.num} ${expectedNote.comments}`;

    // Act
    let note: ScaleNote = parsePitchValue(pitchValueLine);

    // Assert
    expect(note).toBeInstanceOf(CentNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.parsePitchValue(string) builds RatioNote.', () => {

    // Arrange
    let expectedNote: RatioNote = new RatioNote(RANDOM_RATIO(), messyNoteComment);
    let pitchValueLine: string = `${expectedNote.num} ${expectedNote.comments}`;

    // Act
    let note: ScaleNote = parsePitchValue(pitchValueLine);

    // Assert
    expect(note).toBeInstanceOf(RatioNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.parsePitchValue(string) builds IntRatioNote.', () => {

    // Arrange
    let expInt = RANDOM_INT_RATIO();
    let expectedNote: IntRatioNote = new IntRatioNote(expInt, messyNoteComment);
    let pitchValueLine: string = `${expInt} ${expectedNote.comments}`;

    // Act
    let note: ScaleNote = parsePitchValue(pitchValueLine);

    // Assert
    expect(note).toBeInstanceOf(IntRatioNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.parsePitchValue(string) returns INCORRECT_PITCH_VALUE_ERROR message if the pitch value is incorrect.', () => {

    // Arrange
    let badPitchValue: string = '1/'; // could also be '1.'
    let lineNum: number = parseInt(RANDOM_INT_RATIO());

    let expErrorMsg: string = INCORRECT_PITCH_VALUE_ERROR(badPitchValue, lineNum);

    // Act and Assert
    expect(() => parsePitchValue(badPitchValue, lineNum)).toThrowError(expErrorMsg);
});


test('ScalaParser.parsePitchValue(string) returns COMMENT_BEFORE_PITCH_VALUE_ERROR message if there is any text besides whitespace before the pitch value.', () => {

    // Arrange
    let badPitchValue: string = 'a1';
    let lineNum: number = parseInt(RANDOM_INT_RATIO());

    let expErrorMsg: string = COMMENT_BEFORE_PITCH_VALUE_ERROR(badPitchValue, lineNum);

    // Act and Assert
    expect(() => parsePitchValue(badPitchValue, lineNum)).toThrowError(expErrorMsg);
});



// Utilities
const RANDOM_CENTS = (max: number = 1000): string => {
    return (Math.random() * max).toString();
};

const RANDOM_RATIO = (max: number = 1000): string => {
    let numerator: number = Math.trunc(Math.random() * max);
    let denominator: number = Math.trunc(Math.random() * max);
    return `${numerator}/${denominator}`;
};

const RANDOM_INT_RATIO = (max: number = 1000): string => {
    return Math.floor(Math.random() * max).toString();
};