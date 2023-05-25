import {CentNote} from '../CentNote';

let cents: number;
let comment: string;
let expectedMultiplier: number;

// Arrange
beforeAll(() => {
    cents = (Math.random() * 1000.0) + 1;
    comment = 'comment';
    expectedMultiplier = Math.pow(2, cents / 1200);
});


test('CentNote object has correct values when given a number.', () => {
    // Act
    let centNote: CentNote = new CentNote(cents, comment);

    // Assert
    expect(centNote.multiplier).toEqual(expectedMultiplier);
    expect(centNote.cents).toEqual(cents);
    expect(centNote.comments).toEqual(comment);
});

test('CentNote object has correct values when given a string.', () => {
    // Act
    let centNote: CentNote = new CentNote(cents.toString(), comment);

    // Assert
    expect(centNote.multiplier).toEqual(expectedMultiplier);
    expect(centNote.cents).toEqual(cents);
    expect(centNote.comments).toEqual(comment);
});

test('CentNote.centsToMultiplier(number) does the correct math', () => {
    // Act
    let multiplier: number = CentNote.centsToMultiplier(cents);

    // Assert
    expect(multiplier).toEqual(expectedMultiplier);
})