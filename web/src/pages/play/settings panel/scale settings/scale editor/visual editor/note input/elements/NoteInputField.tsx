import * as React from "react";
import {MutableRefObject, useRef, useState} from "react";
import {cleanPitchValue} from "../../../../../../../../utility/microtonal/scala/ScalaParser";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface NoteInputFieldProps {
    noteValue: string;
    isRatio: boolean;
    setIsRatio: (val: boolean) => void;
    editNote: (val: string) => void;
}

// The note's input field is limited to only numbers and
// a single '/' or '.', indicating which type of value (ratio or cent).
export default function NoteInputField(props: NoteInputFieldProps): ReactJSXElement {

    const [noteValue, setNoteValue] = useState<string>(props.noteValue);
    const noteInputRef: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    // These help prevent the cursor from moving to the end of
    // the input field when a user enters a character that isn't
    // accepted (ex: a letter) while they are typing in the middle of the number.
    //
    // For more information and original code:
    // https://github.com/facebook/react/issues/18404#issuecomment-605294038
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputRef.current) {
            [noteInputRef.current.selectionStart, noteInputRef.current.selectionEnd] = selection;
        }
    }, [selection]);

    // This function prevents any characters besides
    // numbers, '/', and '.' from being entered into the input.
    //
    // This is needed because a html input of type 'number'
    // will not allow for forward slashes which are needed to type ratios.
    //
    // The curSelection variable is used to keep track of where the
    // text field's cursor should be. If the user enters an invalid character,
    // subtract 1 to keep it in place, since it increments on every keypress.
    const wrapSetNoteValue = (event: React.ChangeEvent<HTMLInputElement>) => {

        let updatedNote: string = event.target.value;
        let curSelection: [number, number] = [event.target.selectionStart, event.target.selectionEnd];

        let cleanedNote: string = '';
        let seenSlashOrPeriod: boolean = false;
        let curIndex: number = 0;

        if (updatedNote.charAt(0) === '-') {
            if (!updatedNote.includes('/')) {
                cleanedNote += '-';

                curIndex++;
                props.setIsRatio(false);
            }
        }

        for (; curIndex < updatedNote.length; curIndex++) {
            let char: string = updatedNote.charAt(curIndex);

            if (!isNaN(parseInt(char))) {
                cleanedNote += char;
                continue;
            }

            if (!seenSlashOrPeriod && (char === '.' || char === '/')) {
                seenSlashOrPeriod = true;
                cleanedNote += char;

                props.setIsRatio(char === '/');
                continue;
            }

            // Invalid character, move the text cursor back one.
            curSelection = [curSelection[0] - 1, curSelection[1] - 1];
        }

        setSelection(curSelection);
        setNoteValue(cleanedNote);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter')
            event.currentTarget.blur();
    };

    const handleEditNote = (): void => {
        let newNote: string = cleanPitchValue(props.isRatio, noteValue);
        if (newNote === props.noteValue) {
            setNoteValue(props.noteValue);
            return;
        }

        props.editNote(newNote);
    };

    return (
        <input
            type={'string'}
            ref={noteInputRef}
            value={noteValue}
            onChange={(e) => wrapSetNoteValue(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            onBlur={() => handleEditNote()}
            className={'settings-panel-input mx-px'}
        />
    );
}
