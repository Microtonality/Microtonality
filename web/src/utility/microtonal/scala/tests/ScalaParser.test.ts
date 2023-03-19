import {DEFAULT_SCALE, Scale} from '../../Scale';
import { ScaleNote, CentNote, RatioNote, IntRatioNote } from '../../notes';
import { CommentPrefixException, InsufficientPitchValuesException, parsePitchValue, parseScalaFile } from '../ScalaParser'

test('parseScalaFile(string) parses valid file and has correct values', () => {
    
    // Arrange
    let file: string = 
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
    let description: string = '1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)';
    let notes: ScaleNote[] = [];
    let pitchVals: string[] = ['76.04900', '193.15686', '310.26471', '5/4', '503.42157', '579.47057', '696.57843', '25/16', '889.73529', '1006.84314', '1082.89214', '2'];
    for (let val of pitchVals)
        notes.push(parsePitchValue(val));
    let expectedScale: Scale = {...DEFAULT_SCALE, notes, title, description};

    // Act
    let scale: Scale = parseScalaFile(file);

    // Assert
    expect(scale).toEqual(expectedScale);
});

test('ScalaParser.parseScalaFile(string) throws error if there are not enough pitch values', () => {
    
    // Arrange
    let file: string = 
        '\n' + 
        ' 2\n' + 
        '!\n' +
        ' 310.26471\n';

    // Act and Assert
    expect(() => parseScalaFile(file)).toThrowError(InsufficientPitchValuesException);
});

test('ScalaParser.parseScalaFile(string) doesn\'t throw error or save when there are extra pitch values', () => {
    
    // Arrange
    let file: string = 
        '\n' + 
        ' 1\n' + 
        '!\n' +
        ' 310.26471\n' + 
        ' 25/16\n';

    // Create expected scale
    let pitchVal: string = '310.26471';
    let expectedScale: Scale = {...DEFAULT_SCALE, notes: [parsePitchValue(pitchVal)]};

    // Act
    let scale: Scale = parseScalaFile(file);

    // Assert
    expect(scale).toEqual(expectedScale);
});

test('parsePitchValue(string) builds CentNote', () => {

    // Arrange
    let testValue: string = '1.0';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue + testComment;
    let expectedNote: CentNote = new CentNote(testValue, testComment);

    // Act
    let note: ScaleNote = parsePitchValue(testLine);

    // Assert
    expect(note).toBeInstanceOf(CentNote);
    expect(note).toEqual(expectedNote);
});

test('parsePitchValue(string) builds RatioNote', () => {

    // Arrange
    let testValue: string = '1/1';
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue.toString() + testComment;
    let expectedNote: RatioNote = new RatioNote(testValue, testComment);

    // Act
    let note: ScaleNote = parsePitchValue(testLine);

    // Assert
    expect(note).toBeInstanceOf(RatioNote);
    expect(note).toEqual(expectedNote);
});

test('parsePitchValuestring) builds IntRatioNote', () => {

    // Arrange
    let testValue: number = 1;
    let testComment: string = 'commentv2.3 9.5/10';
    let testLine: string = testValue.toString() + testComment;
    let expectedNote: IntRatioNote = new IntRatioNote(testValue, testComment);

    // Act
    let note: ScaleNote = parsePitchValue(testLine);

    // Assert
    expect(note).toBeInstanceOf(IntRatioNote);
    expect(note).toEqual(expectedNote);
});


test('parsePitchValue(string) throws CommentPrefixException', () => {

    // Arrange
    let testValue: string = 'a1';
    let testLine: string = testValue;

    // Act and Assert
    expect(() => parsePitchValue(testLine)).toThrowError(CommentPrefixException);
});
