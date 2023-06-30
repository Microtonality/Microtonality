import {DEFAULT_SCALE, Scale} from "../../Scale";
import {
    getTitle,
    validateTitle,
    GENERATED_TITLE,
    generateScalaFile,
    INVALID_CHAR_IN_TITLE_ERROR, RESERVED_FILENAME_ERROR
} from "../ScalaGenerator";


test('ScalaGenerator.generateScalaFile(Scale) returns a File object containing the data in the Scale.', () => {

    // Arrange
    let scale: Scale = {...DEFAULT_SCALE, title: 'title', description: 'description'};

    // Create expected Scala file.
    // For more information on the structure of Scala files,
    // refer to https://huygens-fokker.org/scala/scl_format.html.
    let expScalaFile: string =
        `! ${scale.title}.scl\n` +
        `!\n` +
        `${scale.description}\n` +
        ` ${scale.notes.length}\n` +
        `!\n` +
        ` ${scale.octaveNote.num} ${scale.octaveNote.comments}\n`;

    let expFile: File = new File([expScalaFile], scale.title, {type: "text"});

    // Act
    let file: File = generateScalaFile(scale);

    // Assert
    expect(file).toEqual(expFile);
});

test('ScalaGenerator.getTitle(Scale) generates a title if the scale has none.', () => {

    // Arrange
    let scale: Scale = {...DEFAULT_SCALE};

    // Act
    let test: string = getTitle(scale);

    // Assert
    expect(test.startsWith(GENERATED_TITLE)).toEqual(true);
    expect(test.endsWith('.scl')).toEqual(true);
});

test('ScalaGenerator.getTitle(Scale) takes the scale\'s title and does not append \'.scl\'.', () => {

    // Arrange
    let title: string = 'title.scl';
    let scale: Scale = {...DEFAULT_SCALE, title};

    // Act
    let test: string = getTitle(scale);

    // Assert
    expect(test).toEqual(title);
});

test('ScalaGenerator.getTitle(Scale) takes the scale\'s title and appends \'.scl\'.', () => {

    // Arrange
    let title: string = 'title';
    let scale: Scale = {...DEFAULT_SCALE, title};

    // Act
    let test: string = getTitle(scale);

    // Assert
    expect(test).toEqual(title + '.scl');
});

test('ScalaGenerator.validateTitle(title) returns when a title is valid.', () => {

    // Arrange
    let validTitle: string = 'valid-title_1';

    // Act
    let test: boolean = validateTitle(validTitle);

    // Assert
    expect(test).toEqual(true);
});

test('ScalaGenerator.validateTitle(title) returns INVALID_CHAR_IN_TITLE_ERROR message when an invalid character is present in the title.', () => {

    // Arrange
    let invalidTitle: string = '$title';
    let invalidCharIndex: number = 0;

    let expErrorMsg: string = INVALID_CHAR_IN_TITLE_ERROR(invalidTitle, invalidTitle[invalidCharIndex]);

    // Act and Assert
    expect(() => validateTitle(invalidTitle)).toThrowError(expErrorMsg);
});

test('ScalaGenerator.validateTitle(title) returns RESERVED_FILENAME_ERROR message when the title is a reserved filename.', () => {

    // Arrange
    // Source: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
    let reservedFilenameList: string[] = ['CON', 'PRN', 'AUX', 'NUL', 'LST',
        'COM0', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
        'LPT0', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];

    // Act and Assert
    let reservedName: string;
    for (reservedName of reservedFilenameList) {
        expect(() => validateTitle(reservedName)).toThrowError(RESERVED_FILENAME_ERROR(reservedName));
    }
});