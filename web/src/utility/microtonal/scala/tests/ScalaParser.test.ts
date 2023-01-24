import { Scale } from '../../Scale';
import { CentNote } from '../../notes/CentNote';
import { IntRatioNote } from '../../notes/IntRatioNote';
import { RatioNote } from '../../notes/RatioNote';
import { ScaleNote } from '../../notes/ScaleNote';
import { ScalaParser } from '../ScalaParser'

// Noteworthy test cases:
//
//   123 wow 7.8/10
//   23 wow 1.1
//   123 blah v2.3 9.5/10
//   22.2/3 asd/2 (22.2)
//   5/5.5 oo4.5.6.6.3o 1.2 (5/5)
// 
// also check valid pitch value list from
// https://www.huygens-fokker.org/scala/scl_format.html 

// ScalaParser.ParseScalaFile(string)
test('ScalaParser.ParseScalaFile(string) parses valid file.', () => {
    
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
    let title: string = 'meanquar';
    let desc: string = '1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)';
    let notes: ScaleNote[] = [];
    var pitchVals = ['76.04900', '193.15686', '310.26471', '5/4', '503.42157', '579.47057', '696.57843', '25/16', '889.73529', '1006.84314', '1082.89214', '2'];
    let val: string;
    for (val of pitchVals) {
        var note: ScaleNote = ScalaParser.ParsePitchValue(val);
        notes.push(note);
    }
    var expectedScale: Scale = new Scale(title, desc, notes);

    // Act
    var scale: Scale = ScalaParser.ParseScalaFile(testFile);

    // Assert
    expect(scale).toEqual(expectedScale);
});

// ScalaParser.ParsePitchValue(string)
test('ScalaParser.ParsePitchValue(string) builds CentNote.', () => {

    // Arrange
    let testValue: string = '1.0';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedNote: CentNote = new CentNote(testValue, testComment);

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toBeInstanceOf(CentNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.ParsePitchValue(string) builds RatioNote.', () => {

    // Arrange
    let testValue: string = '1/1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedNote: RatioNote = new RatioNote(testValue, testComment);

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toBeInstanceOf(RatioNote);
    expect(note).toEqual(expectedNote);
});

test('ScalaParser.ParsePitchValuestring) builds IntRatioNote.', () => {

    // Arrange
    let testValue: string = '1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    const expectedNote: IntRatioNote = new IntRatioNote(testValue, testComment);

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValue(testLine);

    // Assert
    expect(note).toBeInstanceOf(IntRatioNote);
    expect(note).toEqual(expectedNote);
});


// jest.mock('../ScalaParser');

test.skip('ScalaParser.ParsePitchValue(string) throws Error when there\'s comments before the pitch value.', () => {

    // Arrange
    let testValue: string = 'a1';
    let testComment: string = 'comment';
    let testLine: string = testValue + testComment;

    // Act
    const note: ScaleNote = ScalaParser.ParsePitchValue(testLine);

    // Assert
    // expect error to be thrown
});
