// Some code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import hamburger from "../../img/icons/hamburger.png"
import disabledHamburger from "../../img/icons/hamburger-disabled.png"
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import { Scale } from "../../utility/microtonal/Scale";
import { useEffect, useState } from "react";
import { editNote } from "./Reducers";

interface ScaleEditorInputProps {
    noteIndex: number,
    scale: Scale,
    microtonalConfig: MicrotonalConfig,
    setMicrotonalConfig: Function
}

export default function ScaleEditorInput(props: ScaleEditorInputProps) {

    // Check top of file.
    // This prevents the cursor from moving to the end of the input field
    // when a user enters a character that isn't accepted (ex: a letter).
    const [selection, setSelection] = React.useState<[number | null, number | null] | null>(null);
    const noteInputSelection = React.useRef<HTMLInputElement>(null);
    React.useLayoutEffect(() => {
        if (selection && noteInputSelection.current) {
          [noteInputSelection.current.selectionStart, noteInputSelection.current.selectionEnd] = selection;
        }
    }, [selection]);


    const [noteValue, setNoteValue] = useState((props.noteIndex === -1) ? props.scale.octaveMultiplier.num : props.scale.notes[props.noteIndex].num);
    const [isRatio, setIsRatio] = useState((noteValue.includes('.') ? false : true))

    useEffect(() => {
        wrapSetNoteValue(props.scale.notes[props.noteIndex].num);
    }, [props.scale])

    const handleEditNote = () => {
        props.setMicrotonalConfig(editNote(props.microtonalConfig, noteValue, props.noteIndex));
    };

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

        let update: string = event.target.value;
        let newChar: string = '';
        let i: number;
        for (i = 0; i < update.length; i++) {
            if (update[i] !== noteValue[i]) {
                newChar = update[i];
                break;
            }
        }        

        if (update.length < noteValue.length) {
            if (noteValue[i] === '.')
                setIsRatio(() => true);

            setNoteValue(() => update);
            return;
        }

        if (newChar === '/' || newChar === '.') {
            if (noteValue.includes('/') || noteValue.includes('.')) {
                setSelection([event.target.selectionStart - 1, event.target.selectionEnd - 1]); 
                return;
            }
            
            if (newChar === '/')
                setIsRatio(() => true);
            else
                setIsRatio(() => false);
        }
        else if (!parseInt(newChar) && newChar !== '0'){
            setSelection([event.target.selectionStart - 1, event.target.selectionEnd - 1]); 
            return;
        }

        setSelection([event.target.selectionStart, event.target.selectionEnd]); 
        setNoteValue(() => update);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            noteInputSelection.current.blur();
            handleEditNote();
            return;
        }
    }

    return (
        <div className="inline-flex items-center my-[2.5%]">

            {(props.noteIndex === -1) ? 
                /* Octave note, no image */
                <></>
            :
            ((props.noteIndex === 0) ? 
                /* 1/1 note, greyed image */
                <img src={disabledHamburger} className="w-[6%] min-w-[1.5rem]"/>
            :
                /* Every other note, white image */
                <img src={hamburger} className="w-[6%] min-w-[1.5rem]"/>
            )}

            <label htmlFor={props.noteIndex.toString()} className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                <input id={props.noteIndex.toString()} checked={isRatio} type="checkbox" className="hidden peer" readOnly={true}/>
                <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-gold peer-checked:bg-white rounded-l-md border-r-[1px] border-black pt-[4%] min-w-[3rem]">CENTS</div>
                <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">RATIO</div>
            </label>

            <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                {(props.noteIndex === 0) ? 
                    /* 1/1 note, disabled input */
                    <input type="string" disabled={true} value={noteValue} ref={noteInputSelection} onChange={(e) => wrapSetNoteValue(e)} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                :
                    <input type="string" value={noteValue} ref={noteInputSelection} onChange={(e) => wrapSetNoteValue(e)} onKeyDown={(e) => handleKeyDown(e)} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                }
            </div>
        </div>
    );
}