import { IntRatioNote } from '../IntRatioNote';

let intRatio: number;
let comment: string;

beforeAll(() => {
    intRatio = Math.trunc((Math.random() * 1000)) + 1;
    comment = 'comment';
})

test('IntRatioNote object has correct values when given a number', () => {
    // Act
    let intRatioNote: IntRatioNote = new IntRatioNote(intRatio, comment);

    // Assert
    expect(intRatioNote.multiplier).toEqual(intRatio);
    expect(intRatioNote.intRatio).toEqual(intRatio);
    expect(intRatioNote.ratio).toEqual(intRatio + '/1');
    expect(intRatioNote.comments).toEqual(comment);
})

test('IntRatioNote object has correct values when given a number', () => {
    // Act
    let intRatioNote: IntRatioNote = new IntRatioNote(intRatio.toString(), comment);

    // Assert
    expect(intRatioNote.multiplier).toEqual(intRatio);
    expect(intRatioNote.intRatio).toEqual(intRatio);
    expect(intRatioNote.ratio).toEqual(intRatio + '/1');
    expect(intRatioNote.comments).toEqual(comment);
})