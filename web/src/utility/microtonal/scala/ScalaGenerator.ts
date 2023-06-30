import {Scale} from "../Scale";
import {ScaleNote} from "../notes";

export const GENERATED_TITLE: string = 'CustomScale.scl';

export function generateScalaText(scale: Scale): string[] {

    let scala: string[] = [];

    let title: string = getTitle(scale);
    scala.push('! ' + title + '\n');
    scala.push('!\n');

    scala.push(scale.description + '\n');

    scala.push('  ' + scale.notes.length + '\n');
    scala.push('!\n');

    // Remove 1/1 note before printing
    // as this isn't present in Scala files.
    let notes: ScaleNote[] = scale.notes.slice(1);
    let note: ScaleNote;
    for (note of notes)
        scala.push('  ' + note.exportScala() + '\n');
    scala.push('  ' + scale.octaveNote.exportScala());

    return scala;
}

export function generateScalaFile(scale: Scale): File {
    let scala: string[] = generateScalaText(scale);
    return new File(scala, getTitle(scale), {type: "text"});
}

export function getTitle(scale: Scale): string {

    // If the current title doesn't exist, generate one.
    if (scale.title === '') {
        return GENERATED_TITLE;
    }

    validateTitle(scale.title);
    return (scale.title.endsWith('.scl') ? scale.title : scale.title + '.scl');
}

// Check for illegal characters and filenames.
// The only characters allowed are numbers, letters, dashes, and underscores.
export function validateTitle(title: string): boolean {

    let letterOrNumber: RegExp = new RegExp(/[A-z0-9]/)
    let validCharacters: string[] = ['-', '_', ' '];

    // Remove '.scl'
    if (title.endsWith('.scl'))
        title = title.substring(0, title.length - 4);

    // Check for invalid characters.
    for (let i = 0; i < title.length; i++) {

        if (!letterOrNumber.test(title[i])) {
            let validChar: string;
            for (validChar of validCharacters) {
                if (title[i] === validChar)
                    break;

                if (validChar === validCharacters[validCharacters.length - 1])
                    throw new Error(INVALID_CHAR_IN_TITLE_ERROR(title, title[i]));
            }
        }
    }

    // Check if the title is a reserved filename.
    // Source: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words 
    let reservedFilenamesRegex: RegExp = new RegExp(/^(CON|PRN|AUX|NUL|LST|COM[0-9]|LPT[0-9])$/);
    if (reservedFilenamesRegex.test(title))
        throw new Error(RESERVED_FILENAME_ERROR(title));

    return true;
}


// Error Messages
export const INVALID_CHAR_IN_TITLE_ERROR = (title: string, invalidChar: string): string => {
    return (
        `The scale's title '${title}' contains an invalid character, '${invalidChar}'. 
         Only letters, numbers, underscores, and dashes are allowed.
         
         Please change the title and try again.
        `
    );
};

export const RESERVED_FILENAME_ERROR = (title: string): string => {
    return (
        `The scale's title '${title}' is a reserved filename. 
        
         Please change the title and try again.
        `
    );
};