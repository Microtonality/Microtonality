import { Scale } from '../Scale'
import { ScaleNote, RatioNote, CentNote, IntRatioNote } from '../notes'

export function parseScalaFile(file: string): Scale {

    let title: string = '';
    let description: string = '';
    let keysPerOctave: number = 0;
    let notes: ScaleNote[] = [];

    // Read scala file
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
                notes.push(parsePitchValue(line));

                if (keysPerOctave === notes.length)
                    phase = ParserPhase.DONE
        }

        if (phase === ParserPhase.DONE)
            break;
    }

    if (notes.length !== keysPerOctave)
        throw new InsufficientPitchValuesException(`The Scala file has ${keysPerOctave} notes but only ${notes.length} pitch values.`);

    return new Scale(notes, title, description);
}

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
            // Alert the user they may have incorrectly inputted their pitch value? TODO
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

enum ParserPhase {
    TITLE = 0,
    DESCRIPTION = 1,
    KEYS_PER_OCTAVE = 2,
    PITCH_VALUES = 3,
    DONE = 4
}
