import { IntRatioNote } from '../IntRatioNote';

test('IntRatioNote object has correct values', () => {

    // Arrange
    let multiplier: number = Math.trunc((Math.random() * 1000)) + 1;
    let comment: string = 'comment';
    let testNum = multiplier.toString();

    let expectedMultiplier: number = multiplier;

    // Act
    const ratioNote: IntRatioNote = new IntRatioNote(testNum, comment);

    // Assert
    expect(ratioNote.multiplier).toEqual(expectedMultiplier);
    expect(ratioNote.num).toEqual(testNum);
    expect(ratioNote.comments).toEqual(comment);
})

test.skip('IntRatioNote.calcMultiplier(string) throws Error when parseInt() returns NaN', () => {

    // Arrange
    let testNum: string = '';

    // Act and Assert
    const ratioNote: IntRatioNote = new IntRatioNote(testNum);

})
