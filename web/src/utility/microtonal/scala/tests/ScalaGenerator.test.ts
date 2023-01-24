import { Scale } from "../../Scale";
import { IntRatioNote } from "../../notes/IntRatioNote";
import { ScalaGenerator } from "../ScalaGenerator";

test('ScalaGenerator.GenerateScalaFile(Scale) returns a File object.', () => {

    // Arrange
    let scale: Scale = new Scale('', '', [new IntRatioNote('0')]);

    // Act
    let test: File = ScalaGenerator.GenerateScalaFile(scale);

    // Assert
    expect(test).toBeInstanceOf(File);
})

test('ScalaGenerator.GetTitle(Scale) takes the scale\'s title and appends \'.scl\'.', () => {

    // Arrange
    let title: string = 'title';
    let scale: Scale = new Scale(title, '', [new IntRatioNote('0')]);

    // Act
    let test: string = ScalaGenerator.GetTitle(scale);

    // Assert
    expect(test).toEqual(title + '.scl');
})

test('ScalaGenerator.GetTitle(Scale) takes the scale\'s title and does not append \'.scl\'.', () => {

    // Arrange
    let title: string = 'title.scl';
    let scale: Scale = new Scale(title, '', [new IntRatioNote('0')]);

    // Act
    let test: string = ScalaGenerator.GetTitle(scale);

    // Assert
    expect(test).toEqual(title);
})

test('ScalaGenerator.GetTitle(Scale) generates a title is the scale has none.', () => {

    // Arrange
    let scale: Scale = new Scale('', '', [new IntRatioNote('0')]);

    // Act
    let test: string = ScalaGenerator.GetTitle(scale);

    // Assert
    expect(test).toContain(ScalaGenerator.GENERATED_TITLE);
    expect(test).toContain('.scl');
})