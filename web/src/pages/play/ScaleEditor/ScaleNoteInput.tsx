// selection code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {calcRatioMultiplier} from "../../../utility/microtonal/notes/RatioNote";
import {multiplierToCents} from "../../../utility/microtonal/notes/CentNote";
import {MCActions} from "../Reducers";
import {ScaleNote} from "../../../utility/microtonal/notes";

interface ScaleNoteInputProps {
    note: ScaleNote,
    noteIndex: number,
    mcDispatch: Function;
}

// Notes on this scale note input:
// The hamburger and delete buttons are accessible and white.
// The hamburger is used to swap notes by dragging one over the other.
// Delete button deletes the note.
//
// A user is always allowed to convert from a ratio to a cent value,
// but they can only convert BACK from a cent to a ratio value
// if they have not edited the note after the initial conversion.
//
// The note's input field is limited to only numbers
// and a single '/' or '.', indicating which type of value.
//
// For a version of this code without comments, see OctaveNoteInput.tsx
export default function ScaleNoteInput(props: ScaleNoteInputProps) {

    const [noteValue, setNoteValue] = useState<string>(props.note.num);
    const [isRatio, setIsRatio] = useState<boolean>(!noteValue.includes('.'));
    const noteInputField = useRef<HTMLInputElement>(null);

    // Holds the ratio value if the user just converted to a cent value.
    // Set to the empty string upon any note changes.
    const [prevRatioValue, setPrevRatioValue] = useState<string>('');

    useEffect((): void => {
        setNoteValue(props.note.num);
        setIsRatio(!props.note.num.includes('.'))
    }, [props.note.num]);

    // These help prevent the cursor from moving to the end of
    // the input field when a user enters a character that isn't
    // accepted (ex: a letter) while they are typing in the middle of the number.
    //
    // The selection variable allows us to decide where
    // the text cursor is at any given time.
    // For more information click the link at the top of this file.
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputField.current) {
            [noteInputField.current.selectionStart, noteInputField.current.selectionEnd] = selection;
        }
    }, [selection]);

    // This function prevents any characters besides
    // numbers, '.', and '/' from being entered into the input.
    // This is needed because a html input of type 'number'
    // will not allow for '/', which are necessary to write ratios.
    //
    // The setSelection method is used to make sure the text field's cursor
    // isn't moved around whenever a character is prevented from being placed.
    const wrapSetNoteValue = (event: React.ChangeEvent<HTMLInputElement>) => {

        let updatedInput: string = event.target.value;

        // Find the new character.
        let newChar: string = '';
        let i: number;
        for (i = 0; i < updatedInput.length; i++) {
            if (updatedInput[i] !== noteValue[i]) {
                newChar = updatedInput[i];
                break;
            }
        }

        if (newChar === '/' || newChar === '.') {
            // Don't accept duplicates for '/' and '.'
            if (noteValue.includes('/') || noteValue.includes('.')) {
                setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
                return;
            }

            if (newChar === '/')
                setIsRatio(() => true);
            else if (newChar === '.')
                setIsRatio(() => false);
        }
            // Don't accept any character besides a number.
        // Note: parseInt('0') return false, so the extra check is necessary.
        else if (!parseInt(newChar) && newChar !== '0') {
            setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
            return;
        }

        // New character is valid, update the input field.
        setSelection(() => [event.target.selectionStart, event.target.selectionEnd]);
        setNoteValue(() => updatedInput);
    };

    const createConverterBox = (): ReactJSXElement[] => {

        // Styling
        let clickable = "cursor-pointer";
        let notClickable = "cursor-default";
        let notSelected = "bg-white w-[50%] h-full";
        let selected = "bg-gold w-[50%] h-full";
        let leftBorder = "rounded-l-md border-l-[2px] border-black pt-[4%] min-w-[3rem]";
        let rightBorder = "rounded-r-md border-l-[2px] border-black pt-[4%] min-w-[3rem]";

        let centSelected: string = selected + ' ' + leftBorder + ' ' + notClickable;
        let centNotSelected: string = notSelected + ' ' + leftBorder + ' ' + clickable;
        let ratioSelected: string = selected + ' ' + rightBorder + ' ' + notClickable;
        let ratioNotSelected: string = notSelected + ' ' + rightBorder + ' ' + clickable;
        let ratioNotSelectedNotClickable: string = notSelected + ' ' + rightBorder + ' ' + notClickable;

        // Cent and Ratio boxes
        let boxJSX: ReactJSXElement[] = [];

        if (isRatio) {
            boxJSX.push(
                <div onClick={() => ratioToCents()} className={centNotSelected} key={0}>
                    CENTS
                </div>
            );
            boxJSX.push(
                <div className={ratioSelected} key={1}>
                    RATIO
                </div>
            );
        }
        else if (prevRatioValue !== '') {
            boxJSX.push(
                <div className={centSelected} key={0}>
                    CENTS
                </div>
            );
            boxJSX.push(
                <div onClick={() => centsToRatio()} className={ratioNotSelected} key={1}>
                    RATIO
                </div>
            );
        }
        else {
            boxJSX.push(
                <div className={centSelected} key={0}>
                    CENTS
                </div>
            );
            boxJSX.push(
                <div className={ratioNotSelectedNotClickable} key={1}>
                    RATIO
                </div>
            );
        }

        return boxJSX;
    };

    const editNote = (note: string) => {
        props.mcDispatch({type: MCActions.EDIT_NOTE, noteValue: note, noteIndex: props.noteIndex});
    }

    const ratioToCents = () => {
        setPrevRatioValue(noteValue);
        setIsRatio(false);

        let noteMultiplier = calcRatioMultiplier(noteValue);
        if (noteMultiplier <= 1) {
            setNoteValue(() => '0.0');
            return;
        }

        let cents: string = multiplierToCents(noteMultiplier);
        editNote(cents);
    };

    const centsToRatio = () => {
        setIsRatio(true);
        editNote(prevRatioValue);
        setPrevRatioValue('');
    };

    const handleEditNote = () => {
        let newNoteValue = cleanInput(noteValue);
        if (newNoteValue === props.note.num) {
            setNoteValue(newNoteValue);
            return;
        }

        setPrevRatioValue('');
        editNote(newNoteValue);
    };

    // Checks within wrapSetNoteValue() allow us to assume
    // that the only edge cases here could be '', '/', and '.'.
    const cleanInput = (value: string): string => {
        // If we get the empty string, return the original value.
        if (value === '')
            return props.note.num;

        let cleanedValue: string = value;

        // If the user originally had a cent value and
        // the value is an integer, keep the cent value status.
        if (!cleanedValue.includes('/') && !cleanedValue.includes('.')) {
            if (!isRatio) {
                cleanedValue += '.0';
                return cleanedValue;
            }
        }

        // '/' and '.' convert to base note values '1/1' and '0.0' respectively.
        // Other cases such as '2/' or '.41' are given '1' and '0'
        //  respectively to fill in any missing values.
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

    // Handle 'Enter' key event from text field.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // onBlur() will fire and call handleEditNote()
            noteInputField.current.blur();
            return;
        }
    };

    const handleDeleteNote = () => {
        props.mcDispatch({type: MCActions.DELETE_NOTE, noteIndex: props.noteIndex});
    }

    return (
        <div className="inline-flex items-center mx-[1%] my-[2.5%] w-[95%]">

            {/* TODO onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)}*/}
            <svg width="25" height="25" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <line y1="0.5" x2="12" y2="0.5" stroke="white"/>
                <line y1="10.5" x2="12" y2="10.5" stroke="white"/>
                <line y1="5.5" x2="12" y2="5.5" stroke="white"/>
            </svg>

            {/*TODO check if we need htmlFor*/}
            <label htmlFor={props.noteIndex.toString()} className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                <input type="checkbox" checked={isRatio} id={props.noteIndex.toString()} className="hidden peer" readOnly={true}/>
                {createConverterBox()}
            </label>

            <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                <input type="string"
                       ref={noteInputField}
                       value={noteValue}
                       onChange={(e) => wrapSetNoteValue(e)}
                       onKeyDown={(e) => handleKeyDown(e)}
                       onBlur={() => handleEditNote()}
                       className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
            </div>

            <svg onClick={() => handleDeleteNote()} width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer ml-1">
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="white" strokeWidth="2"/>
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="white" strokeWidth="2"/>
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="white" strokeWidth="2"/>
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="white" strokeWidth="2"/>
            </svg>

        </div>
    );
}
