import { CentNote } from '../CentNote';

test('CentNote object has correct values', () => {

    // Arrange
    let cents: number = (Math.random() * 1000.0) + 1;
    let comment: string = 'comment';
    let testNum = cents.toString();

    let expectedMultiplier: number = Math.pow(Math.pow(2, 1/12), cents * 0.01);

    // Act
    const ratioNote: CentNote = new CentNote(testNum, comment);

    // Assert
    expect(ratioNote.multiplier).toEqual(expectedMultiplier);
    expect(ratioNote.num).toEqual(testNum);
    expect(ratioNote.comments).toEqual(comment);
})

test.skip('CentNote.calcMultiplier(string) throws Error when parseFloat() returns NaN', () => {

    // Arrange
    let testNum: string = '';

    // Act and Assert
    const ratioNote: CentNote = new CentNote(testNum);

})

test('CentNote.reverseCalc(number) returns cent value', () => {

    // Arrange
    let multiplier: number = (Math.random() * 1000.0) + 1;
    
    let expectedCents: number = 1200 * Math.log2(multiplier);

    // Act
    let test: string = CentNote.reverseCalc(multiplier);

    // Assert
    expect(parseFloat(test)).toEqual(expectedCents);
})
