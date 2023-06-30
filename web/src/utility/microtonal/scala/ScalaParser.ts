import {DEFAULT_SCALE, Scale} from '../Scale'
import {ScaleNote, RatioNote, CentNote} from '../notes'
import {BaseRatioNote} from "../notes/RatioNote";
import {BaseCentNote} from "../notes/CentNote";

enum ParserPhase {
    DESCRIPTION,
    KEYS_PER_OCTAVE,
    PITCH_VALUES
}

// For more information on the structure of Scala files,
// refer to https://huygens-fokker.org/scala/scl_format.html.
export function parseScalaFile(file: string): Scale {

    let scale: Scale = DEFAULT_SCALE;
    let notes: ScaleNote[] = [];
    let octaveNote: ScaleNote = null;

    let fileLines: string[] = file.split('\n');
    let lineNum: number = 1;

    let firstLine: string = fileLines.at(0).trim();
    if (firstLine.startsWith('!')) {
        scale = {...scale, title: readTitle(firstLine)};

        fileLines.shift();
        lineNum++;
    }

    let keysPerOctave: number = -1;
    let phase: ParserPhase = ParserPhase.DESCRIPTION;
    for (let line of fileLines) {

        line = line.trim();
        lineNum++;

        if (line.startsWith('!'))
            continue;

        if (phase === ParserPhase.DESCRIPTION) {
            scale = {...scale, description: line};
            phase = ParserPhase.KEYS_PER_OCTAVE;
        }
        else if (phase === ParserPhase.KEYS_PER_OCTAVE) {
            keysPerOctave = parseInt(line);
            if (isNaN(keysPerOctave))
                throw new Error(INCORRECT_KEYS_PER_OCTAVE_ERROR(lineNum, line));

            phase = ParserPhase.PITCH_VALUES;
        }
        else if (phase === ParserPhase.PITCH_VALUES) {
            let note: ScaleNote = parsePitchValue(line, lineNum);
            if (!note)
                throw new Error(INCORRECT_PITCH_VALUE_ERROR(line, lineNum));

            if (notes.length === keysPerOctave - 1) {
                octaveNote = note;
                break;
            }

            notes.push(note);
        }
    }

    if (notes.length < keysPerOctave - 1 || !octaveNote)
        throw new Error(NOT_ENOUGH_PITCH_VALUES_ERROR(keysPerOctave, notes.length));

    notes.unshift(getBaseNote(notes.at(0) ?? octaveNote));

    scale = {...scale, notes: notes, octaveNote: octaveNote};
    return scale;
}

function readTitle(line: string): string {
    let title: string = line;

    // Remove '!'
    title = title.substring(1);
    title = title.trim();

    // Make sure to grab the first word.
    let words: string[] = title.split(' ');
    title = words.at(0);

    if (title.endsWith('.scl'))
        title = title.substring(0, title.length - 4);

    return title;
}

// Based on the pitch line from the Scala file, figure
// out which kind of note it is and where exactly the value lies.
// Then, separate the value from the comments and create a new ScaleNote object.
//
// Unfortunately we cannot use regex here, as there
// are too many edge cases that would yield inconsistent results.
// The user is allowed to put any characters they want
// after the pitch value, so a regex could easily catch numbers
// in the comments as well as the value itself.
//
// Note: lineNum is optional because parsePitchValue() is called from other files.
export function parsePitchValue(line: string, lineNum?: number): ScaleNote {

    let num: string = '';
    let noteType: (typeof CentNote | typeof RatioNote) = null;

    if (line.startsWith('-')) {
        num += '-';
        noteType = CentNote;
        line = line.substring(1);
    }

    let curIndex: number = 0;
    for (; curIndex < line.length; curIndex++) {
        let char: string = line.charAt(curIndex);

        if (!isNaN(parseInt(char))) {
            num += char;
            continue;
        }

        if (char === '.' && !num.includes('.')) {
            noteType = CentNote;
            num += char;
        }
        else if (char === '/' && !num.includes('/')) {
            noteType = RatioNote;
            num += char;
        }
        else {
            if (num.length === 0)
                throw new Error(COMMENT_BEFORE_PITCH_VALUE_ERROR(line, lineNum));

            break;
        }
    }

    noteType ??= RatioNote
    num = cleanPitchValue((noteType === RatioNote), num);

    return new noteType(num, line.substring(curIndex).trim());
}

export function cleanPitchValue(isRatio: boolean, num: string): string {
    return (isRatio) ? cleanRatioValue(num) : cleanCentValue(num);
}

function cleanCentValue(cent: string): string {
    if (cent === '' || cent === '-' || cent === '.')
        return BaseCentNote.num;

    cent = parseFloat(cent).toString();

    if (!cent.includes('.'))
        cent += '.0';

    return cent;
}

function cleanRatioValue(ratio: string): string {
    if (ratio === '' || ratio === '/')
        return BaseRatioNote.num;

    if (ratio.startsWith('-'))
        ratio = ratio.substring(1);

    if (ratio.startsWith('/'))
        ratio = '1' + ratio;

    if (ratio.endsWith('/'))
        ratio += '1';
    else if (!ratio.includes('/'))
        ratio += '/1';

    let cleanedNumerator: number = parseInt(ratio.slice(0, ratio.indexOf('/')));
    let cleanedDenominator: number = parseInt(ratio.slice(ratio.indexOf('/') + 1));
    if (cleanedDenominator === 0)
        cleanedDenominator = 1;

    return cleanedNumerator + '/' + cleanedDenominator;
}

function getBaseNote(note: ScaleNote): ScaleNote {
    return (note instanceof RatioNote) ? BaseRatioNote : BaseCentNote;
}

// Error Messages
export const INCORRECT_KEYS_PER_OCTAVE_ERROR = (lineNum: number, line: string): string => {
    return (
        `The number of pitch values in your Scala file must be an integer.
        
         Check line ${lineNum}: "${line}"
        `
    );
};

export const NOT_ENOUGH_PITCH_VALUES_ERROR = (keysPerOctave: number, notesLength: number): string => {
    let difference: number = keysPerOctave - notesLength;
    let s: string = (difference === 1) ? "" : "s";
    return (
        `The Scala file needs ${keysPerOctave} pitch values but only has ${notesLength}.
        
         Please insert ${difference} more pitch value${s} or adjust the scale's size.
        `
    );
};

export const INCORRECT_PITCH_VALUE_ERROR = (line: string, lineNum?: number): string => {
    return (
        `Pitch value at line ${lineNum} is incorrect: "${line}"
        
         Only cents (100.0), ratios (1/2), or integers (2 (shorthand for 2/1)) 
         are allowed, followed by an optional comment.
        `
    );
};

export const COMMENT_BEFORE_PITCH_VALUE_ERROR = (line: string, lineNum?: number): string => {
    return (
        `You cannot have comments before a pitch value.
        
         Check line ${lineNum}: "${line}"
        `
    );
};
