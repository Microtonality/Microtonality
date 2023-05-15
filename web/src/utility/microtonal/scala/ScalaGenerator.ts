import { Scale } from "../Scale";
import { ScaleNote } from "../notes";

export const GENERATED_TITLE: string = 'CustomScale_';

// Create a Scala file (.scl) from the given scale.
export function generateScalaFile(scale: Scale): File {

    let file: string[] = [];

    let title: string = getTitle(scale);
    file.push('! ' + title + '\n');
    file.push('!\n');

    file.push(scale.description + '\n');

    file.push('  ' + scale.notes.length + '\n');
    file.push('!\n');

    // Remove 1/1 note before printing
    // as this isn't present in Scala files.
    scale.notes.shift();

    let note: ScaleNote;
    for (note of scale.notes) 
        file.push('  ' + note.exportScala() + '\n');
    file.push('  ' + scale.octaveNote.exportScala() + '\n');

    file.push('\n');
    return new File(file, title, {type: "text"});
}

export function getTitle(scale: Scale): string {

    // If the current title doesn't exist, generate one.
    if (scale.title === '') {
        scale.title = generateTitle();
        return scale.title;
    }

    scale.title = scale.title.replace(' ', '_');
    validateTitle(scale.title);

    return (scale.title.endsWith('.scl') ? scale.title : scale.title + '.scl');
}

// Make sure each generated file title is different.
export function generateTitle(): string {

    const date: Date = new Date();

    const fileID: string = '' + date.getMinutes() + 
                                date.getHours() + 
                                date.getDay() + 
                                date.getMonth() + 
                                (date.getFullYear() % 100);

    return GENERATED_TITLE + fileID + '.scl';
}

// Check for illegal characters and filenames.
// The only characters allowed are numbers, letters, dashes, and underscores.
export function validateTitle(title: string): boolean {

    let letterOrNumber: RegExp = new RegExp(/[A-z0-9]/)
    let validCharacters: string[] = ['-', '_'];

    // Remove '.scl'
    if (title.endsWith('.scl'))
        title = title.substring(0, title.length - 4);

    // Check the title for invalid characters.
    for (let i = 0; i < title.length; i++) {

        if (!letterOrNumber.test(title[i])) {
            let validChar: string;
            for (validChar of validCharacters) {
                if (title[i] === validChar)
                    break;

                // Check if we're at the end of the valid character list.
                // if (validChar === validCharacters[validCharacters.length - 1]) // TODO: uncomment once scale settings are done
                    // throw new Error(INVALID_CHAR_IN_TITLE_ERROR(title, title[i])); // TODO: uncomment once scale settings are done
            }
        }
    }

    // Check if the title is a reserved filename.
    // Source: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words 
    // let reservedFilenamesRegex: RegExp = new RegExp(/^(CON|PRN|AUX|NUL|LST|COM[0-9]|LPT[0-9])/); // TODO: uncomment once scale settings are done
    // if (reservedFilenamesRegex.test(title)) // TODO: uncomment once scale settings are done
    //     throw new Error(RESERVED_FILENAME_ERROR(title)); // TODO: uncomment once scale settings are done

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