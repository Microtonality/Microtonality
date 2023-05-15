// selection code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {calcRatioMultiplier} from "../../../utility/microtonal/notes/RatioNote";
import {multiplierToCents} from "../../../utility/microtonal/notes/CentNote";
import {MCActions} from "../Reducers";
import {ScaleNote} from "../../../utility/microtonal/notes";

interface OctaveNoteInputProps {
    note: ScaleNote,
    mcDispatch: Function;
}

// Notes on this scale note input:
// The hamburger and delete buttons are inaccessible and invisible (match background).
// All other functionality is the same as ScaleNoteInput.tsx.
// Check that file for more information on these variables and functions.
export default function OctaveNoteInput(props: OctaveNoteInputProps) {

    const [noteValue, setNoteValue] = useState<string>(props.note.num);
    const [isRatio, setIsRatio] = useState<boolean>(!noteValue.includes('.'));
    const noteInputField = useRef<HTMLInputElement>(null);

    const [prevRatioValue, setPrevRatioValue] = useState<string>('');

    useEffect((): void => {
        setNoteValue(props.note.num);
        setIsRatio(!props.note.num.includes('.'))
    }, [props.note.num]);

    // For more information on these variables and
    // wrapSetNoteValue(), see ScaleNoteInput.tsx in this directory.
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputField.current) {
            [noteInputField.current.selectionStart, noteInputField.current.selectionEnd] = selection;
        }
    }, [selection]);
    const wrapSetNoteValue = (event: React.ChangeEvent<HTMLInputElement>) => {

        let updatedInput: string = event.target.value;

        if (updatedInput.length === noteValue.length - 1) {
            setNoteValue(() => updatedInput);
            setPrevRatioValue('');
            return;
        }

        let newChar: string = '';
        let i: number;
        for (i = 0; i < updatedInput.length; i++) {
            if (updatedInput[i] !== noteValue[i]) {
                newChar = updatedInput[i];
                break;
            }
        }

        if (newChar === '/' || newChar === '.') {
            if (noteValue.includes('/') || noteValue.includes('.')) {
                setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
                return;
            }

            if (newChar === '/')
                setIsRatio(() => true);
            else if (newChar === '.')
                setIsRatio(() => false);
        }
        else if (!parseInt(newChar) && newChar !== '0') {
            setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
            return;
        }

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
        props.mcDispatch({type: MCActions.EDIT_OCTAVE_NOTE, noteValue: note});
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

    const cleanInput = (value: string): string => {
        if (value === '')
            return props.note.num;

        let cleanedValue: string = value;

        if (!cleanedValue.includes('/') && !cleanedValue.includes('.')) {
            if (!isRatio) {
                cleanedValue += '.0';
                return cleanedValue;
            }
        }

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
        if (event.key === 'Enter') {
            noteInputField.current.blur();
            return;
        }
    };

    return (
        <div>
            <div key={'OctaveNoteTitle'} className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                Octave Note
            </div>

            <div className={`inline-flex items-center w-full`}>
                <div className="inline-flex items-center mx-[1%] my-[2.5%] w-[95%]">

                    <svg width="25" height="25" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                        <line y1="0.5" x2="12" y2="0.5" stroke="#313131"/>
                        <line y1="10.5" x2="12" y2="10.5" stroke="#313131"/>
                        <line y1="5.5" x2="12" y2="5.5" stroke="#313131"/>
                    </svg>

                    <label className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                        <input type="checkbox" checked={isRatio} className="hidden peer" readOnly={true}/>
                        {createConverterBox()}
                    </label>

                    <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                        <input type="string" ref={noteInputField} value={noteValue} onChange={(e) => wrapSetNoteValue(e)} onKeyDown={(e) => handleKeyDown(e)} onBlur={() => handleEditNote()} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                    </div>

                    <svg width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="#313131" strokeWidth="2"/>
                        <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="#313131" strokeWidth="2"/>
                        <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="#313131" strokeWidth="2"/>
                        <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="#313131" strokeWidth="2"/>
                    </svg>

                </div>
            </div>
        </div>
    );
}
