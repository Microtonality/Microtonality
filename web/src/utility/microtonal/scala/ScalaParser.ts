import {DEFAULT_SCALE, Scale} from '../Scale'
import { ScaleNote, RatioNote, CentNote, IntRatioNote } from '../notes'

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

    // Note: keysPerOctave does not include the
    // initial '1/1' note, but does include the octave note.
    let keysPerOctave: number = 0;
    let notes: ScaleNote[] = [];
    let octaveNote: ScaleNote = null;

    // Read Scala file, split by line.
    let phase: ParserPhase = ParserPhase.TITLE;
    for (let line of file.split(/[\r\n]+/)) {

        line = line.trim();

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
                    throw Error('The number of pitch values in your Scala file must be an integer.');

                phase = ParserPhase.PITCH_VALUES;
                continue;

            case ParserPhase.PITCH_VALUES:
                // Check for the octave note.
                if (notes.length === keysPerOctave - 1) {
                    octaveNote = parsePitchValue(line);
                    phase = ParserPhase.DONE
                }
                else {
                    notes.push(parsePitchValue(line));
                }
        }

        if (phase === ParserPhase.DONE)
            break;
    }

    if (octaveNote === null)
        throw new InsufficientPitchValuesException(`The Scala file needs ${keysPerOctave} pitch values but only has ${notes.length}`);

    // Add the 1/1 note to the beginning.
    notes.unshift(new RatioNote('1/1'));
    return {...DEFAULT_SCALE, notes, title, description, octaveNote};
}

// Based on the pitch line from the Scala file, figure
// out which kind of note it is and where exactly the value lies.
// Then separate the value from the comments and create a new ScaleNote object.
// Unfortunately we cannot use regex here, as there
// are too many edge cases that would yield inconsistent results.
// The user is technically allowed to put any characters they want
// after the pitch value, so a regex could very well catch numbers
// in the comments as well as the value itself.
export function parsePitchValue(line: string): ScaleNote {

    let value: string = '';
    let comments: string = '';
    let noteType: (typeof CentNote | typeof RatioNote | typeof IntRatioNote) = null;

    let seenChar: boolean = false;
    let i: number;
    for (i = 0; i < line.length; i++) {

        let char: string = line.charAt(i);

        if (isNaN(parseInt(char))) {

            if (seenChar)
                break;

            if (value.length === 0)
                throw new CommentPrefixException(`You cannot have comments before a pitch value: ${line}`);

            if (char === '.') 
                noteType = CentNote;
            else if (char === '/')
                noteType = RatioNote;
            else {
                noteType = IntRatioNote;
                break;
            }

            // Check if the next character exists or is not a number.
            // This is for cases '1/' or '1.' where the user may
            // have forgotten the number after the '/' or '.' 
            if (((i+1) >= line.length) || (isNaN(parseInt(line.charAt(i+1))))) {
                noteType = IntRatioNote;
                break;
            }

            seenChar = true;
        }

        value += char;
    }

    // For single digit integer ratios with no comments.
    if (noteType === null && !isNaN(parseInt(line)))
        noteType = IntRatioNote;

    if (noteType === null)
        throw new InsufficientPitchValuesException(`The pitch value line does not contain a value: \'${line}\'.`);

    comments = line.substring(i).trim();

    return new noteType(value, comments);
}

export class CommentPrefixException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export class InsufficientPitchValuesException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
