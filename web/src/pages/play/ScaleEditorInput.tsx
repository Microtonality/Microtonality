// Some code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import hamburger from "../../img/icons/hamburger.png"
import disabledHamburger from "../../img/icons/hamburger-disabled.png"
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import { Scale } from "../../utility/microtonal/Scale";
import { useEffect, useState } from "react";
import {MCActions} from "./Reducers";

interface ScaleEditorInputProps {
    noteIndex: number,
    scale: Scale,
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function ScaleEditorInput(props: ScaleEditorInputProps) {

    const [noteValue, setNoteValue] = useState((props.noteIndex === -1) ? props.scale.octaveNote.num : props.scale.notes[props.noteIndex].num);
    const [isRatio, setIsRatio] = useState((noteValue.includes('.') ? false : true))

    useEffect(() => {
        wrapSetNoteValue((props.noteIndex === -1) ? props.scale.octaveNote.num : props.scale.notes[props.noteIndex].num);
    }, [props.microtonalConfig])

    // Check top of file.
    // These help prevent the cursor from moving to the end of the input field
    // when a user enters a character that isn't accepted (ex: a letter).
    // It allows us to declare exactly where we want the cursor to be placed.
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    const noteInputField = React.useRef<HTMLInputElement>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputField.current) {
            [noteInputField.current.selectionStart, noteInputField.current.selectionEnd] = selection;
        }
    }, [selection]);

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

            setNoteValue(event);
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
                setSelection([event.target.selectionStart - 1, event.target.selectionEnd - 1]); 
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
            setSelection([event.target.selectionStart - 1, event.target.selectionEnd - 1]); 
            return;
        }

        // Looks good, update the input field.
        setSelection([event.target.selectionStart, event.target.selectionEnd]); 
        setNoteValue(() => updatedInput);
    }

    const handleEditNote = () => {
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
    }

    return (
        <div className="inline-flex items-center my-[2.5%]">

            {(props.noteIndex === -1) ? 
                /* If Octave note, no image */
                <></>
            :
            ((props.noteIndex === 0) ? 
                /* If 1/1 note, greyed image */
                <img src={disabledHamburger} className="w-[6%] min-w-[1.5rem]"/>
            :
                /* Otherwise, white image */
                <img src={hamburger} className="w-[6%] min-w-[1.5rem]"/>
            )}

            <label htmlFor={props.noteIndex.toString()} className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                <input id={props.noteIndex.toString()} checked={isRatio} type="checkbox" className="hidden peer" readOnly={true}/>
                <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-gold peer-checked:bg-white rounded-l-md border-r-[1px] border-black pt-[4%] min-w-[3rem]">CENTS</div>
                <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">RATIO</div>
            </label>

            <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                {(props.noteIndex === 0) ? 
                    /* If 1/1 note, disabled input */
                    <input type="string" disabled={true} ref={noteInputField} value={noteValue} onChange={(e) => wrapSetNoteValue(e)} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                :
                    /* Otherwise, enabled */
                    <input type="string" ref={noteInputField} value={noteValue} onChange={(e) => wrapSetNoteValue(e)} onKeyDown={(e) => handleKeyDown(e)} onBlur={(e) => handleEditNote()} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                }
            </div>
        </div>
    );
}