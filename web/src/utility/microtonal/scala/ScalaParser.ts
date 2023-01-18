import { Scale } from '../Scale'
import { ScaleNote } from '../notes/ScaleNote'
import { RatioNote } from '../notes/RatioNote'
import { CentNote } from '../notes/CentNote'
import { IntRatioNote } from '../notes/IntRatioNote';

// TODO: TEST

export class ScalaParser {

    public static ParseScalaFile(file: string): Scale {

        let title: string = '';
        let description: string = '';
        let keysPerOctave: number = 0;
        var notes: ScaleNote[] = [];

        // Read scala file
        let phase: ParserPhase = ParserPhase.TITLE;
        let line: string = '';
        for (line of file.split(/[\r\n]+/)) {

            // Read title, if there is one.
            // We want this before we look for comments,
            // since it is a comment and is always the first one.
            if (phase === ParserPhase.TITLE) {
                if (line.startsWith('!')) {
                    line = line.substring(1); // Remove '!'
                    line = line.trim();

                    title = line;
                    phase = ParserPhase.DESCRIPTION;
                    continue;
                }

                phase = ParserPhase.DESCRIPTION;
            }

            if (line.startsWith('!'))
                continue;

            line = line.trim();

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
                    notes.push(ScalaParser.ParsePitchValueLine(line));

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

    public static ParsePitchValueLine(line: string): ScaleNote {
        
        var noteInfo: NoteInfo = ScalaParser.ParsePitchValue(line);

        switch (noteInfo.type) {            
            case NoteType.CENT:
                return new CentNote(noteInfo.num, noteInfo.comments);
            
            case NoteType.RATIO:
                return new RatioNote(noteInfo.num, noteInfo.comments);

            case NoteType.INTRATIO:
                return new IntRatioNote(noteInfo.num, noteInfo.comments);
        }
    }

    public static ParsePitchValue(line: string): NoteInfo {

        var type: NoteType = NoteType.NULL;
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
                        type = NoteType.CENT;
                        num += char;
                        continue;
                    } 
                    else if (char === '/') {
                        readSlashOrDecimal = true;
                        type = NoteType.RATIO;
                        num += char;
                        continue;
                    }
                }

                if (num.length !== 0) {

                    if (type === NoteType.NULL)
                        type = NoteType.INTRATIO;

                    break;
                }
            }

            num += char;
        }

        // For single digit integer ratios.
        if (!isNaN(parseInt(num)) && type === NoteType.NULL)
            type = NoteType.INTRATIO;

        if (type === NoteType.NULL)
            throw new Error('ScalaParser.ParsePitchValue(' + line + '): NoteType was still null.');

        comments = line.substring(i).trim();

        return new NoteInfo(type, num, comments);
    }
}

enum ParserPhase {
    TITLE = 0,
    DESCRIPTION = 1,
    KEYS_PER_OCTAVE = 2,
    PITCH_VALUES = 3,
    DONE = 4
}

export class NoteInfo {

    public type: NoteType;
    public num: string;
    public comments: string;

    constructor(_type: NoteType, _num: string, _comments: string) {

        this.type = _type;
        this.num = _num;
        this.comments = _comments;
    }
}

export enum NoteType {
    NULL = 0,
    CENT = 1,
    RATIO = 2,
    INTRATIO = 3
}
