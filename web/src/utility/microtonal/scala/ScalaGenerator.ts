import { Scale } from "../Scale";
import { ScaleNote } from "../notes";

export const GENERATED_TITLE: string = 'MicrotonalScale_';

export function generateScalaFile(scale: Scale): File {

    let file: string[] = [];

    let title: string = getTitle(scale);
    file.push('! ' + title + '\n');
    file.push('!\n');

    file.push(scale.description + '\n');

    file.push('  ' + scale.notes.length + '\n');
    file.push('!\n');

    let note: ScaleNote = null;
    for (note of scale.notes) 
        file.push('  ' + note.exportScala() + '\n');

    file.push('\n');
    return new File(file, title, {type: "text/plain"});
}

export function getTitle(scale: Scale): string {

    if (scale.title === '')
        scale.title = generateTitle();
    else {
        validateTitle(scale.title);

        if (!scale.title.endsWith('.scl'))
            return scale.title + '.scl';
    }

    return scale.title;
}

export function generateTitle(): string {

    const date: Date = new Date();

    const fileID: string = '' + date.getMinutes() + 
                                date.getHours() + 
                                date.getDay() + 
                                date.getMonth() + 
                                (date.getFullYear() % 100);

    return GENERATED_TITLE + fileID + '.scl';
}

export function validateTitle(title: string): void {

    let letterOrNumber: RegExp = new RegExp(/[A-z0-9]/)
    let validCharacters: string[] = ['-', '_'];

    if (title.endsWith('.scl'))
        title = title.substring(0, title.length - 4);

    // Check the title for invalid characters.
    for (let i = 0; i < title.length; i++) {

        if (!letterOrNumber.test(title[i])) {
            let validChar: string;
            for (validChar of validCharacters) {
                if (title[i] === validChar)
                    break;
                
                if (validChar === validCharacters[validCharacters.length - 1])
                    throw new InvalidFilenameException(`The title \'${title}\' contains an invalid character, \'${title[i]}\'. You may only use letters, numbers, underscores, and dashes.`);
            }
        }
    }

    // Check if the title is a reserved filename.
    // Source: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words 
    let reservedFilenamesRegex: RegExp = new RegExp(/^CON|PRN|AUX|NUL|LST|COM[0-9]|LPT[0-9]$/);
    if (reservedFilenamesRegex.test(title))
        throw new InvalidFilenameException(`The title \'${title}\' is a reserved filename. Please change it to something else.`);
}

export class InvalidFilenameException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}