import * as React from "react";
import {MutableRefObject, useRef, useState} from "react";

interface NoteInputFieldProps {
    noteValue: string;
    isRatio: boolean;
    setIsRatio: (val: boolean) => void;
    editNote: (val: string) => void;
}

// The note's input field is limited to only numbers and
// a single '/' or '.', indicating which type of value (ratio or cent).
export default function NoteInputField(props: NoteInputFieldProps) {

    const [noteValue, setNoteValue] = useState<string>(props.noteValue);
    const noteInputField: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    // These help prevent the cursor from moving to the end of
    // the input field when a user enters a character that isn't
    // accepted (ex: a letter) while they are typing in the middle of the number.
    //
    // The selection variable allows us to decide where
    // the text cursor is at any given time.
    //
    // For more information and original code:
    // https://github.com/facebook/react/issues/18404#issuecomment-605294038
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputField.current) {
            [noteInputField.current.selectionStart, noteInputField.current.selectionEnd] = selection;
        }
    }, [selection]);

    // This function prevents any characters besides
    // numbers, '/', and '.' from being entered into the input.
    //
    // This is needed because a html input of type 'number'
    // will not allow for '/', which are needed to write ratios.
    //
    // The setSelection method is used to make sure the text field's cursor
    // isn't moved around whenever a character is prevented from being placed.
    const wrapSetNoteValue = (event: React.ChangeEvent<HTMLInputElement>) => {

        let updatedInput: string = event.target.value;

        // If the user deletes a character, accept the change.
        if (updatedInput.length < noteValue.length) {
            setNoteValue(() => updatedInput);
            return;
        }

        // Find the new character.
        let newChar: string = '';
        let i: number;
        for (i = 0; i < updatedInput.length; i++) {
            if (updatedInput[i] !== noteValue[i]) {
                newChar = updatedInput[i];
                break;
            }
        }

        // Don't accept duplicates for '/' and '.'
        if (newChar === '/' || newChar === '.') {
            if (noteValue.includes('/') || noteValue.includes('.')) {
                setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
                return;
            }

            if (newChar === '/')
                props.setIsRatio(true);
            else if (newChar === '.')
                props.setIsRatio(false);
        }
        // Don't accept any character besides a number.
        // Note: parseInt('0') return false, so the extra check is necessary.
        else if (!parseInt(newChar) && newChar !== '0') {
            setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
            return;
        }

        // New character is valid, update the input field.
        setSelection([event.target.selectionStart, event.target.selectionEnd]);
        setNoteValue(updatedInput);
    };

    // Checks within wrapSetNoteValue() allow us to assume
    // that the only edge cases here could be '', '/', '.', and 'x/' or '.x'.
    const cleanInput = (value: string): string => {
        // If we get the empty string, return the original value.
        if (value === '')
            return props.noteValue;

        let cleanedValue: string = value;

        // If the user originally had a cent value and
        // the value is an integer, keep the cent value status.
        // Normally we would convert it to a ratio.
        if (!cleanedValue.includes('/') && !cleanedValue.includes('.')) {
            if (!props.isRatio) {
                cleanedValue += '.0';
                return cleanedValue;
            }

            cleanedValue += '/1';
            return cleanedValue;
        }

        // '/' and '.' convert to base note values '1/1' and '0.0' respectively.
        // Other cases such as '2/' or '.41' are given '1' and '0'
        // respectively to fill in the missing numbers.
        let firstChar: string = value.charAt(0);
        if (firstChar === '/')
            cleanedValue = '1' + cleanedValue;
        else if (firstChar === '.')
            cleanedValue = '0' + cleanedValue;

        let lastChar: string = value.charAt(value.length - 1);
        if (lastChar === '/')
            cleanedValue += '1';
        else if (lastChar === '.')
            cleanedValue += '0';

        return cleanedValue;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
            noteInputField.current.blur();
    };

    const handleEditNote = () => {
        let newNote = cleanInput(noteValue);
        if (newNote === props.noteValue) {
            setNoteValue(props.noteValue);
            return;
        }

        props.editNote(newNote);
    };

    return (
        <input
            type={'string'}
            ref={noteInputField}
            value={noteValue}
            onChange={(e) => wrapSetNoteValue(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            onBlur={() => handleEditNote()}
            className={'settings-panel-input mx-px'}
        />
    );
}
