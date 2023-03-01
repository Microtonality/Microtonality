import { CentNote, calcCentsMultiplier } from '../CentNote';

let cents: number;
let comment: string;
let expectedMultiplier: number;

// Arrange
beforeAll(() => {
    cents = (Math.random() * 1000.0) + 1;
    comment = 'comment';
    expectedMultiplier = Math.pow(Math.pow(2, 1/12), cents * 0.01);
})


test('CentNote object has correct values when given a number', () => {
    // Act
    let centNote: CentNote = new CentNote(cents, comment);

    // Assert
    expect(centNote.multiplier).toEqual(expectedMultiplier);
    expect(centNote.cents).toEqual(cents);
    expect(centNote.comments).toEqual(comment);
})

test('CentNote object has correct values when given a string', () => {
    // Act
    let centNote: CentNote = new CentNote(cents.toString(), comment);

    // Assert
    expect(centNote.multiplier).toEqual(expectedMultiplier);
    expect(centNote.cents).toEqual(cents);
    expect(centNote.comments).toEqual(comment);
})

test('calcCentsMultiplier() does the correct math', () => {
    // Act
    let multiplier: number = calcCentsMultiplier(cents);

    // Assert
    expect(multiplier).toEqual(expectedMultiplier);
})

test('CentNote.exportScala() appends \'.0\' if the cent value does not have a decimal place', () => {

    // Arrange
    let centsWithoutDecimal: number = Math.trunc(cents);
    let centNote: CentNote = new CentNote(centsWithoutDecimal, comment);
    
    let expectedExport: string = centsWithoutDecimal + '.0 ' + comment;

    // Act
    let scalaExport: string = centNote.exportScala();

    // Assert
    expect(scalaExport).toEqual(expectedExport);
})
