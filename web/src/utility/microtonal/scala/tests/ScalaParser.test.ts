import { Scale } from '../../Scale';
import { CentNote } from '../../notes/CentNote';
import { IntRatioNote } from '../../notes/IntRatioNote';
import { RatioNote } from '../../notes/RatioNote';
import { ScaleNote } from '../../notes/ScaleNote';
import { NoteInfo, NoteType, ScalaParser } from '../ScalaParser'

// Noteworthy test cases:
//
//   123 wow 7.8/10
//   23 wow 1.1
//   123 blah v2.3 9.5/10
//   22.2/3 asd/2 (22.2)
//   5/5.5 oo4.5.6.6.3o 1.2 (5/5)

// ScalaParser.ParseScalaFile(string)
test('ScalaParser.ParseScalaFile(string)', () => {
    
    // Arrange
    let testFile: string = 
        '! meanquar.scl\n' + 
        '!\n' + 
        '1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)\n' + 
        ' 12\n' + 
        '!\n' +
        ' 76.04900\n' +
        ' 193.15686\n' + 
        ' 310.26471\n' + 
        ' 5/4\n' + 
        ' 503.42157\n' + 
        ' 579.47057\n' + 
        ' 696.57843\n' + 
        ' 25/16\n' + 
        ' 889.73529\n' + 
        ' 1006.84314\n' +
        ' 1082.89214\n' +
        ' 2\n';

    // Create expected scale
    let title: string = 'meanquar.scl';
    let desc: string = '1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)';
    let notes: ScaleNote[] = [];
    var pitchVals = ['76.04900', '193.15686', '310.26471', '5/4', '503.42157', '579.47057', '696.57843', '25/16', '889.73529', '1006.84314', '1082.89214', '2'];
    let val: string;
    for (val of pitchVals) {
        var note: ScaleNote = ScalaParser.ParsePitchValueLine(val);
        notes.push(note);
    }
    var expectedScale: Scale = new Scale(title, desc, notes);

    // Act
    var scale: Scale = ScalaParser.ParseScalaFile(testFile);

    // Assert
    expect(scale).toEqual(expectedScale);
});

// ScalaParser.ParsePitchValueLine(string)
test('ScalaParser.ParsePitchValueLine(string) builds CentNote', () => {

    // Arrange
    let testValue: string = '1.0';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedNote: CentNote = new CentNote(testValue, testComment);

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValueLine(testLine);

    // Assert
    expect(note).toBeInstanceOf(CentNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.ParsePitchValueLine(string) builds RatioNote', () => {

    // Arrange
    let testValue: string = '1/1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedNote: RatioNote = new RatioNote(testValue, testComment);

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValueLine(testLine);

    // Assert
    expect(note).toBeInstanceOf(RatioNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.ParsePitchValueLine(string) builds IntRatioNote', () => {

    // Arrange
    let testValue: string = '1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedNote: IntRatioNote = new IntRatioNote(testValue, testComment);

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValueLine(testLine);

    // Assert
    expect(note).toBeInstanceOf(IntRatioNote);
    expect(note).toEqual(expectedNote);
});

// ScalaParser.ParsePitchValue(string)
test('ScalaParser.ParsePitchValue(string) builds NoteInfo with type CENT', () => {

    // Arrange
    let testValue: string = '1.0';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedInfo: NoteInfo = new NoteInfo(NoteType.CENT, testValue, testComment);

    // Act
    const note: NoteInfo = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toEqual(expectedInfo);
});

test('ScalaParser.ParsePitchValue(string) builds NoteInfo with type RATIO', () => {

    // Arrange
    let testValue: string = '1/1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedInfo: NoteInfo = new NoteInfo(NoteType.RATIO, testValue, testComment);

    // Act
    const note: NoteInfo = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toEqual(expectedInfo);
});

test('ScalaParser.ParsePitchValue(string) builds NoteInfo with type INTRATIO', () => {

    // Arrange
    let testValue: string = '1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedInfo: NoteInfo = new NoteInfo(NoteType.INTRATIO, testValue, testComment);

    // Act
    const note: NoteInfo = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toEqual(expectedInfo);
});


// jest.mock('../ScalaParser');

test.skip('ScalaParser.ParsePitchValue(string) throws Error when there\'s comments before the pitch value', () => {

    // Arrange
    let testValue: string = 'a1';
    let testComment: string = 'comment';
    let testLine: string = testValue + testComment;
    const expectedInfo: NoteInfo = new NoteInfo(NoteType.NULL, '', '');

    // Act
    const note: NoteInfo = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toEqual(expectedInfo);
});
