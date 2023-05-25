import {DEFAULT_SCALE, Scale} from '../Scale'
import {ScaleNote, RatioNote, CentNote} from '../notes'

enum ParserPhase {
    TITLE = 0,
    DESCRIPTION = 1,
    KEYS_PER_OCTAVE = 2,
    PITCH_VALUES = 3,
    DONE = 4
}

// The ScalaParser reads Scala files and creates a Scale object.
// For more information on the structure of Scala files,
// refer to https://huygens-fokker.org/scala/scl_format.html.
export function parseScalaFile(file: string): Scale {

    let title: string = '';
    let description: string = '';

    // Note: The notes array includes the initial '1/1' (or '0.0' cents)
    // base note, but does not include the octave note.
    let keysPerOctave: number = 0;
    let notes: ScaleNote[] = [new RatioNote('1/1')];
    let octaveNote: ScaleNote = null;

    // Read Scala file, split by line.
    let line: string = '';
    let lineNum: number = 0;
    let phase: ParserPhase = ParserPhase.TITLE;
    for (line of file.split(/[\r\n]+/)) {

        line = line.trim();

        // lineNum is initialized to 0 but incremented at the beginning of the loop.
        // As such, the line numbers are indexed at 1 rather than 0,
        // mainly for when the user has to read error messages.
        lineNum++;

        // Read title, if there is one.
        // We want this before we look for comments,
        // since it is a comment and is always the first one.
        if (phase === ParserPhase.TITLE) {
            if (line.startsWith('!')) {
                line = line.substring(1); // Remove '!'
                line = line.trim();

                if (line.endsWith('.scl'))
                    line = line.substring(0, line.length - 4); // Remove '.scl'

                title = line;
                phase = ParserPhase.DESCRIPTION;
                continue;
            }

            phase = ParserPhase.DESCRIPTION;
        }

        // Now we can skip the rest of the comments.
        if (line.startsWith('!'))
            continue;

        // Read description, keys per octave, 
        // and create note objects for each pitch value.
        switch (phase) {

            case ParserPhase.DESCRIPTION:
                description = line;
                phase = ParserPhase.KEYS_PER_OCTAVE;
                continue;

            case ParserPhase.KEYS_PER_OCTAVE:
                keysPerOctave = parseInt(line);
                if (isNaN(keysPerOctave))
                    throw new Error(INCORRECT_KEYS_PER_OCTAVE_ERROR(lineNum));

                phase = ParserPhase.PITCH_VALUES;
                continue;

            case ParserPhase.PITCH_VALUES:
                if (line === '')
                    throw new Error(NOT_ENOUGH_PITCH_VALUES_ERROR(keysPerOctave, notes.length - 1)); // - 1 for base note

                let note: ScaleNote = parsePitchValue(line, lineNum);
                if (note === null)
                    throw new Error(INCORRECT_PITCH_VALUE_ERROR(line, lineNum));

                if (notes.length === keysPerOctave) {
                    octaveNote = note;
                    phase = ParserPhase.DONE;
                }
                else {
                    notes.push(note);
                }
        }

        if (phase === ParserPhase.DONE)
            break;
    }

    return {...DEFAULT_SCALE, notes, title, description, octaveNote};
}



// Based on the pitch line from the Scala file, figure
// out which kind of note it is and where exactly the value lies.
// Then, separate the value from the comments and create a new ScaleNote object.
// Unfortunately we cannot use regex here, as there
// are too many edge cases that would yield inconsistent results.
// The user is allowed to put any characters they want
// after the pitch value, so a regex could easily catch numbers
// in the comments as well as the value itself.

// Note: lineNum is optional because parsePitchValue() is called from other files.
export function parsePitchValue(line: string, lineNum?: number): ScaleNote {

    let value: string = '';
    let comments: string = '';
    let noteType: (typeof CentNote | typeof RatioNote) = null;

    let seenChar: boolean = false;
    let i: number;
    for (i = 0; i < line.length; i++) {

        let char: string = line.charAt(i);

        if (isNaN(parseInt(char))) {

            if (seenChar)
                break;

            if (value.length === 0)
                throw new Error(COMMENT_BEFORE_PITCH_VALUE_ERROR(line, lineNum));

            if (char === '.') 
                noteType = CentNote;
            else if (char === '/')
                noteType = RatioNote;
            else {
                noteType = RatioNote;
                break;
            }

            seenChar = true;

            // Check if the next character exists or is not a number.
            // This is for cases '1/' or '1.'
            if ((i+1) === line.length || isNaN(parseInt(line.charAt(i+1)))) {
                if (noteType === CentNote) {
                    value += '0';
                }
                else {
                    value += '1';
                }
            }
        }

        value += char;
    }

    // For single digit integer ratios with no comments.
    if (noteType === null && !isNaN(parseInt(line)))
        noteType = RatioNote;

    comments = line.substring(i).trim();

    return new noteType(value, comments);
}


// Error Messages
export const INCORRECT_KEYS_PER_OCTAVE_ERROR = (lineNum: number): string => {
    return (
        `The number of pitch values in your Scala file (at line ${lineNum}) must be an integer. (ex: 12 or 37)
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
        
         Check pitch value at line ${lineNum}: "${line}"
        `
    );
};
