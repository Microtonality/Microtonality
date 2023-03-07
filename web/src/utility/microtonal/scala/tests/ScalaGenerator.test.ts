import { Scale } from "../../Scale";
import { CentNote, IntRatioNote, RatioNote, ScaleNote } from "../../notes";
import { getTitle, validateTitle, GENERATED_TITLE, InvalidFilenameException, generateScalaFile } from "../ScalaGenerator";

let notes: ScaleNote[];
let scale: Scale;

beforeAll(() => {
    notes = [new ScaleNote('1', 1)];
    scale = new Scale([new ScaleNote('1', 1)], '', '');
})

test('getTitle(Scale) takes the scale\'s title and appends \'.scl\'', () => {

    // Arrange
    let title: string = 'title';
    let scale: Scale = new Scale(notes, title, '');

    // Act
    let test: string = getTitle(scale);

    // Assert
    expect(test).toEqual(title + '.scl');
})

test('getTitle(Scale) takes the scale\'s title and does not append \'.scl\'', () => {

    // Arrange
    let title: string = 'title.scl';
    let scale: Scale = new Scale(notes, title, '');

    // Act
    let test: string = getTitle(scale);

    // Assert
    expect(test).toEqual(title);
})

test('getTitle(Scale) generates a title if the scale has none', () => {

    // Act
    let test: string = getTitle(scale);

    // Assert
    expect(test).toContain(GENERATED_TITLE);
    expect(test).toContain('.scl');
})

test('validateTitle(title) throws Error when an invalid character is present', () => {

    // Arrange
    let invalidTitle: string = 'title$';

    // Act and Assert
    expect(() => validateTitle(invalidTitle)).toThrowError(InvalidFilenameException);
})

test('validateTitle(title) throws Error when the title is a reserved filename', () => {

    // Arrange
    let reservedFilenameList: string[] = ['CON', 'PRN', 'AUX', 'NUL', 'LST', 'COM0', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT0', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
    let roll: number = Math.trunc((Math.random() * reservedFilenameList.length));
    let test = reservedFilenameList[roll];

    // Act and Assert
    expect(() => validateTitle(test)).toThrowError(InvalidFilenameException);
})