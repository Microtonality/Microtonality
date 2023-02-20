import { Scale } from '../Scale'
import { ScaleNote } from '../notes/ScaleNote'
import { RatioNote } from '../notes/RatioNote'
import { CentNote } from '../notes/CentNote'
import { IntRatioNote } from '../notes/IntRatioNote';

export class ScalaParser {

    public static ParseScalaFile(file: string | ArrayBuffer): Scale {

        let fileAsText: string = '';
        if (file instanceof ArrayBuffer)
            fileAsText = new TextDecoder().decode(file);
        else 
            fileAsText = file;

        let title: string = '';
        let description: string = '';
        let keysPerOctave: number = 0;
        var notes: ScaleNote[] = [];

        // Read scala file
        let phase: ParserPhase = ParserPhase.TITLE;
        let line: string = '';
        for (line of fileAsText.split(/[\r\n]+/)) {

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
                        throw Error('The number of pitch values must be an integer.');

                    phase = ParserPhase.PITCH_VALUES;
                    continue;

                case ParserPhase.PITCH_VALUES:
                    notes.push(ScalaParser.ParsePitchValue(line));

                    if (notes.length === keysPerOctave)
                        phase = ParserPhase.DONE;
                    continue;
            }

            if (phase === ParserPhase.DONE)
                break;
        }

        if (notes.length !== keysPerOctave)
            throw Error('The Scala file does not have a pitch value for each key in the octave.');

        return new Scale(title, description, notes);
    }

    public static ParsePitchValue(line: string): ScaleNote {

        let noteType: typeof ScaleNote = null;
        let num: string = '';
        let comments: string = '';

        let readSlashOrDecimal: boolean = false;
        let i: number;
        for (i = 0; i < line.length; i++) {

            let char: string = line.charAt(i);

            if (isNaN(parseInt(char))) {

                if (num.length === 0)
                    throw Error('ScalaParser.ParsePitchValue(' + line + '): You cannot have comments before a pitch value.');

                if (!readSlashOrDecimal) {
                    if (char === '.') {
                        readSlashOrDecimal = true;
                        noteType = CentNote;
                        num += char;
                        continue;
                    } 
                    else if (char === '/') {
                        readSlashOrDecimal = true;
                        noteType = RatioNote;
                        num += char;
                        continue;
                    }
                }

                if (num.length !== 0) {
                    if (noteType === null)
                        noteType = IntRatioNote;

                    break;
                }
            }

            num += char;
        }

        // For single digit integer ratios with no comments.
        if (!isNaN(parseInt(num)) && noteType === null)
            noteType = IntRatioNote;

        if (noteType === null)
            throw new Error('ScalaParser.ParsePitchValue(' + line + '): Could not find a note type for the pitch value.');

        comments = line.substring(i).trim();

        return new noteType(num, comments);
    }
}

enum ParserPhase {
    TITLE = 0,
    DESCRIPTION = 1,
    KEYS_PER_OCTAVE = 2,
    PITCH_VALUES = 3,
    DONE = 4
}
