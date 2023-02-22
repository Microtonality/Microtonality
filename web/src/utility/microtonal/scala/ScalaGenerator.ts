import { Scale } from "../Scale";
import { ScaleNote } from "../notes/ScaleNote";

export class ScalaGenerator {

    public static GENERATED_TITLE: string = 'MicrotonalScale_';

    public static GenerateScalaFile(scale: Scale): File {

        let fileTitle: string = '';
        let fileData: string[] = [];

        fileTitle = ScalaGenerator.GetTitle(scale);
        fileData.push('! ' + fileTitle + '\n');
        fileData.push('!\n');

        fileData.push(scale.description + '\n');

        fileData.push('  ' + scale.notes.length + '\n');
        fileData.push('!\n');

        let note: ScaleNote = null;
        for (note of scale.notes)
            fileData.push('  ' + note.exportScala() + ' ' + note.comments + '\n');
        fileData.push('\n');

        return new File(fileData, fileTitle, {type: "text/plain"});
    }

    public static GetTitle(scale: Scale): string {

        if (scale.title === '')
            scale.title = ScalaGenerator.GenerateTitle();
        else
            ScalaGenerator.ValidateTitle(scale.title);

        if (scale.title.endsWith('.scl'))
            return scale.title;
        
        return scale.title + '.scl';
    }

    public static GenerateTitle(): string {

        const date: Date = new Date();

        const fileID: string = '' + date.getMinutes() + 
                                    date.getHours() + 
                                    date.getDay() + 
                                    date.getMonth() + 
                                    (date.getFullYear() % 100);

        return ScalaGenerator.GENERATED_TITLE + fileID;
    }

    public static ValidateTitle(title: string): void {

        let letterOrNumber: RegExp = new RegExp(/[A-z0-9]/)
        let validCharacters: string[] = ['-', '_'];

        if (title.endsWith('.scl'))
            title = title.substring(0, title.length - 4);

        // Check the title for invalid characters.
        let i: number;
        for (i = 0; i < title.length; i++) {

            if (!letterOrNumber.test(title[i])) {
                let validChar: string;
                for (validChar of validCharacters) {
                    if (title[i] === validChar)
                        break;
                    
                    if (validChar !== validCharacters[validCharacters.length - 1])
                        throw new Error('ScalaGenerator.ValidateTitle(' + title + '): The title contains an invalid character (' + title[i] +'). You may only use letters, numbers, underscores, and dashes.');
                }
            }
        }

        // Check if the title is a reserved filename.
        // Source: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words 
        let reservedFilenamesRegex: RegExp = new RegExp(/^CON|PRN|AUX|NUL|LST|COM[0-9]|LPT[0-9]$/);
        if (reservedFilenamesRegex.test(title))
            throw new Error('ScalaGenerator.ValidateTitle(' + title + '): The title is a reserved filename. Please change it.');
    }
}