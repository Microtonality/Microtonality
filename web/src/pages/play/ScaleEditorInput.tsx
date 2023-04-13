// Some code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import { Scale } from "../../utility/microtonal/Scale";
import {useEffect, useRef, useState} from "react";
import {MCActions} from "./Reducers";
import {calcRatioMultiplier} from "../../utility/microtonal/notes/RatioNote";
import {multiplierToCents} from "../../utility/microtonal/notes/CentNote";

interface ScaleEditorInputProps {
    noteIndex: number,
    scale: Scale,
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function ScaleEditorInput(props: ScaleEditorInputProps) {

    const [noteValue, setNoteValue] = useState((props.noteIndex === -1) ? props.scale.octaveNote.num : props.scale.notes[props.noteIndex].num);
    const [isRatio, setIsRatio] = useState(!noteValue.includes('.'));

    useEffect(() => {
        wrapSetNoteValue((props.noteIndex === -1) ? props.scale.octaveNote.num : props.scale.notes[props.noteIndex].num);
    }, [props.microtonalConfig]);

    useEffect(() => {
        setIsRatio(!noteValue.includes('.'));
    }, [noteValue]);

    // This function prevents any characters besides numbers, '.', and '/'
    // from being entered into the input.
    // This is needed because a html input of type "number" will not allow for '/',
    // which are required to write ratios.
    // setSelection is used to make sure the cursor isn't moved around whenever
    // a character is prevented from being placed.
    const wrapSetNoteValue = (event: React.ChangeEvent<HTMLInputElement> | string) => {

        // This should only be triggered by useEffect()
        if (typeof event === 'string') {
            if (event.includes('.'))
                setIsRatio(() => false);
            else
                setIsRatio(() => true);

            setNoteValue(() => event);
            return;
        }

        let updatedInput: string = event.target.value;

        // If the user deleted a character, always accept it
        if (updatedInput.length < noteValue.length) {
            // TODO test if this is deleted that a cent value can be entered without a 0 after the decimal place
            if (updatedInput[updatedInput.length - 1] === '.')
                setIsRatio(() => true);

            setNoteValue(() => updatedInput);
            return;
        }

        // Find the new character
        let newChar: string = '';
        let i: number;
        for (i = 0; i < updatedInput.length; i++) {
            if (updatedInput[i] !== noteValue[i]) {
                newChar = updatedInput[i];
                break;
            }
        }        

        if (newChar === '/' || newChar === '.') {
            // Don't accept duplicates.
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
        // Note: parseInt('0') return false, so the extra check is necessary
        else if (!parseInt(newChar) && newChar !== '0'){
            setSelection(() => [event.target.selectionStart - 1, event.target.selectionEnd - 1]);
            return;
        }

        // New character is valid, update the input field.
        setSelection(() => [event.target.selectionStart, event.target.selectionEnd]);
        setNoteValue(() => updatedInput);
    };

    const handleEditNote = () => {
        if (noteValue === '') {
            setNoteValue(() => (props.noteIndex === -1) ? props.scale.octaveNote.num : props.scale.notes[props.noteIndex].num);
            return;
        }

        if (props.noteIndex === -1)
            props.mcDispatch({type: MCActions.EDIT_OCTAVE_NOTE, noteValue: noteValue});
        else
            props.mcDispatch({type: MCActions.EDIT_NOTE, noteValue: noteValue, noteIndex: props.noteIndex});
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            noteInputField.current.blur();
            handleEditNote();
            return;
        }
    };

    const handleDeleteNote = () => {
        props.mcDispatch({type: MCActions.DELETE_NOTE, noteIndex: props.noteIndex});
    }

    // Note: We can't normally convert from cents to a ratio
    // without significant data loss and unreadable numbers
    // because floats have a lot of extra hidden numbers.
    // So we only allow converting from a ratio to a cent value.
    // (except for the base note which is the 1/1 note)
    const convertRatioToCents = () => {
        if (!isRatio) {
            console.log('error, current note is a cent value');
            return;
        }

        let noteMultiplier = calcRatioMultiplier(noteValue);
        if (noteMultiplier <= 1) {
            setNoteValue(() => '0.0');
            setIsRatio(false);
            return;
        }

        let cents: string = multiplierToCents(noteMultiplier);
        if (props.noteIndex === -1)
            props.mcDispatch({type: MCActions.EDIT_OCTAVE_NOTE, noteValue: cents});
        else
            props.mcDispatch({type: MCActions.EDIT_NOTE, noteValue: cents, noteIndex: props.noteIndex});

    }

    // Only allowed for the base note (cent value of 0.0)
    const baseNoteCentsToRatio = () => {
        setNoteValue(() => '1/1');
        setIsRatio(true);
    }

    // Check top of file.
    // These help prevent the cursor from moving to the end of the input field
    // when a user enters a character that isn't accepted (ex: a letter)
    // while they are typing in the middle of the number.
    // It allows us to declare exactly where we want the cursor to be placed.
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    const noteInputField = useRef<HTMLInputElement>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputField.current) {
            [noteInputField.current.selectionStart, noteInputField.current.selectionEnd] = selection;
        }
    }, [selection]);

    return (
        <div className="inline-flex items-center mx-[1%] my-[2.5%] w-[95%]">

            {(props.noteIndex === -1) ? 
                /* If Octave note, no image */
                <img className="w-[6%] min-w-[1.5rem]" alt={''}/>
            :
            ((props.noteIndex === 0) ? 
                /* If 1/1 note, greyed image */
                <svg width="25" height="25" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <line y1="0.5" x2="12" y2="0.5" stroke="#212121"/>
                    <line y1="10.5" x2="12" y2="10.5" stroke="#212121"/>
                    <line y1="5.5" x2="12" y2="5.5" stroke="#212121"/>
                </svg>

            :
                /* Otherwise, white image */
                <svg width="25" height="25" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <line y1="0.5" x2="12" y2="0.5" stroke="white"/>
                    <line y1="10.5" x2="12" y2="10.5" stroke="white"/>
                    <line y1="5.5" x2="12" y2="5.5" stroke="white"/>
                </svg>
            )}

            <label htmlFor={props.noteIndex.toString()} className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                <input id={props.noteIndex.toString()} checked={isRatio} type="checkbox" className="hidden peer" readOnly={true}/>

                {/* If the number is a cent value, the user cannot click.
                    If it's a ratio and the 1/1 note, use special conversion.
                    If it's a ratio and not 1/1 note, convert it. */}
                {!isRatio ?
                    <div className="cursor-default w-[50%] h-full bg-gold peer-checked:bg-white rounded-l-md border-r-[1px] border-black pt-[4%] min-w-[3rem]">
                        CENTS
                    </div>
                :
                    <div onClick={() => convertRatioToCents()} className="cursor-pointer w-[50%] h-full bg-gold peer-checked:bg-white rounded-l-md border-r-[1px] border-black pt-[4%] min-w-[3rem]">
                        CENTS
                    </div>
                }

                {props.noteIndex !== 0 ?
                    <div className="cursor-default w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">
                        RATIO
                    </div>
                :
                (!isRatio ?
                    <div onClick={() => baseNoteCentsToRatio()} className="cursor-pointer w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">
                        RATIO
                    </div>
                :
                    <div className="cursor-default w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">
                        RATIO
                    </div>
                )}

            </label>

            <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                {(props.noteIndex === 0) ?
                    /* If 1/1 note, disabled input */
                    <input type="string" disabled={true} ref={noteInputField} value={noteValue} onChange={(e) => wrapSetNoteValue(e)} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                :
                    /* Otherwise, enabled */
                    <input type="string" ref={noteInputField} value={noteValue} onChange={(e) => wrapSetNoteValue(e)} onKeyDown={(e) => handleKeyDown(e)} onBlur={() => handleEditNote()} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                }
            </div>

            {(props.noteIndex === -1) ?
                /* If Octave note, no image */
                <img className="w-[8%] h-[8%] min-w-[1.5rem]" alt={''}/>
            :
            ((props.noteIndex === 0) ?
                /* If 1/1 note, greyed image */
                <svg width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="#212121" strokeWidth="2"/>
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="#212121" strokeWidth="2"/>
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="#212121" strokeWidth="2"/>
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="#212121" strokeWidth="2"/>
                </svg>
            :
                /* Otherwise, white image */
                // <img src={close} onClick={() => handleDeleteNote()} className="w-[8%] h-[8%] min-w-[1.5rem] cursor-pointer" alt={''}/>
                <svg onClick={() => handleDeleteNote()} width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer ml-1">
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="white" strokeWidth="2"/>
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="white" strokeWidth="2"/>
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="white" strokeWidth="2"/>
                    <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="white" strokeWidth="2"/>
                </svg>
            )}

        </div>
    );
}