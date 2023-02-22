import { IntRatioNote } from '../IntRatioNote';

test('IntRatioNote object has correct values', () => {

    // Arrange
    let multiplier: number = Math.trunc((Math.random() * 1000)) + 1;
    let comment: string = 'comment';
    let testNum = multiplier;

    let expectedMultiplier: number = multiplier;

    // Act
    const ratioNote: IntRatioNote = new IntRatioNote(testNum, comment);

    // Assert
    expect(ratioNote.multiplier).toEqual(expectedMultiplier);
    expect(ratioNote.intRatio).toEqual(testNum);
    expect(ratioNote.comments).toEqual(comment);
})
