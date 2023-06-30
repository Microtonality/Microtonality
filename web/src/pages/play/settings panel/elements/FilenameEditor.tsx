import * as React from "react";
import SettingsFieldTitle from "./SettingsFieldTitle";
import {MutableRefObject, useRef, useState} from "react";
import {useSetErrorMsg} from "../../PlayProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface FilenameEditorProps {
    className?: string;
    title: string;
    filename: string;
    setFilename: (name: string) => void;
}

export default function FilenameEditor(props: FilenameEditorProps): ReactJSXElement {

    const errorMsgDispatch: Function = useSetErrorMsg();

    const [tempFilename, setTempFilename] = useState<string>(props.filename);
    const filenameInputRef: MutableRefObject<HTMLInputElement> = useRef(null);

    // These help prevent the cursor from moving to the end of
    // the input field when a user enters a character that isn't
    // accepted (ex: a letter) while they are typing in the middle of the number.
    //
    // For more information and original code:
    // https://github.com/facebook/react/issues/18404#issuecomment-605294038
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    React.useLayoutEffect(() => {
        if (selection && filenameInputRef.current) {
            [filenameInputRef.current.selectionStart, filenameInputRef.current.selectionEnd] = selection;
        }
    }, [selection]);

    const wrapSetFilename = (event: React.ChangeEvent<HTMLInputElement>): void => {

        let updatedName: string = event.target.value;
        let curSelection: [number, number] = [event.target.selectionStart, event.target.selectionEnd];

        let letterOrNumber: RegExp = new RegExp(/[A-z0-9]/);
        let validChars: string[] = ['-', '_', ' '];

        let cleanedName: string = '';
        for (let char of updatedName) {
            if (letterOrNumber.test(char) || validChars.includes(char)) {
                cleanedName += char;
                continue;
            }

            // Invalid character, move the text cursor back one.
            curSelection = [curSelection[0] - 1, curSelection[1] - 1];
        }

        setSelection(curSelection);
        setTempFilename(cleanedName);
    }

    const validateFilename = (name: string): void => {
        // Source: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
        let reservedFilenames: RegExp = new RegExp(/^(CON|PRN|AUX|NUL|LST|COM[0-9]|LPT[0-9])$/);
        if (reservedFilenames.test(name))
            throw new Error(RESERVED_FILENAME_ERROR(name));
    }

    const handleSubmit = (name: string): void => {
        try {
            name.trim();
            validateFilename(name);
            props.setFilename(name);
        } catch (e) {
            errorMsgDispatch(e.message);
        }
    }

    const handleKeyDown = (key: string): void => {
        if (key === 'Enter') {
            filenameInputRef.current.blur();
        }
    }

    return (
        <div className={props.className}>
            <SettingsFieldTitle text={props.title}/>
            <input
                className={'settings-panel-input w-full'}
                tabIndex={0}
                value={tempFilename}
                ref={filenameInputRef}
                onChange={(e) => wrapSetFilename(e)}
                onKeyDown={(e) => handleKeyDown(e.key)}
                onBlur={(e) => handleSubmit(e.target.value)}
            />
        </div>
    );
}

const RESERVED_FILENAME_ERROR = (filename: string): string => {
    return (
        `The synth config's filename '${filename}' is a reserved filename. 
        
         Please change the filename and try again.
        `
    );
};