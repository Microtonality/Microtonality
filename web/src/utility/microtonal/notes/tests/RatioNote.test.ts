import { RatioNote } from '../RatioNote';

test('RatioNote object has correct values', () => {

    // Arrange
    let numerator: number = Math.trunc((Math.random() * 1000)) + 1;
    let denominator: number = Math.trunc((Math.random() * 1000)) + 1;
    let testNum: string = numerator.toString() + '/' + denominator.toString();
    let comment: string = 'comment';
    
    let expectedMultiplier: number = numerator / denominator;

    // Act
    const ratioNote: RatioNote = new RatioNote(testNum, comment);

    // Assert
    expect(ratioNote.multiplier).toEqual(expectedMultiplier);
    expect(ratioNote.num).toEqual(testNum);
    expect(ratioNote.comments).toEqual(comment);
})

// jest.mock('../RatioNote')

test.skip('Ratio.calcMultiplier(string) throws Error when denominator is 0', () => {

    // Arrange
    let testNum: string = '1/0';

    // Act
    const ratioNote: RatioNote = new RatioNote(testNum);

})

test.skip('Ratio.calcMultiplier(string) throws Error when parseInt() returns NaN', () => {

    // Arrange
    let testNum: string = '';

    // Act
    const ratioNote: RatioNote = new RatioNote(testNum);

})