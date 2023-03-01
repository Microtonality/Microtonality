import { RatioNote, calcRatioMultiplier, InvalidRatioException } from '../RatioNote';

let numerator: number;
let denominator: number;
let ratio: string;
let expectedMultiplier: number;
let comment: string;

beforeAll(() => {
    numerator = Math.trunc((Math.random() * 1000)) + 1;
    denominator = Math.trunc((Math.random() * 1000)) + 1;
    ratio = numerator + '/' + denominator;
    expectedMultiplier = numerator / denominator;
    comment = 'comment';
})

test('RatioNote object has correct values', () => {
    // Act
    let ratioNote: RatioNote = new RatioNote(ratio, comment);

    // Assert
    expect(ratioNote.multiplier).toEqual(expectedMultiplier);
    expect(ratioNote.ratio).toEqual(ratio);
    expect(ratioNote.comments).toEqual(comment);
})

test('calcRatioMultiplier parses and returns correct value', () => {
    // Act
    let multiplier = calcRatioMultiplier(ratio);

    // Assert
    expect(multiplier).toEqual(expectedMultiplier);
})

test('Ratio.calcRatioMultiplier(string) throws Error when denominator is 0', () => {
    // Act and Assert
    expect(() => calcRatioMultiplier('1/0')).toThrowError(InvalidRatioException);
})