import * as React from "react";
import {useState} from "react";
import {MCActions} from "../../../../../Reducers";
import {ScaleNote} from "../../../../../../../utility/microtonal/notes";
import DisabledReorderIcon from "./elements/DisabledReorderIcon";
import NoteConverter from "./elements/NoteConverter";
import DisabledCloseButton from "../../../../elements/DisabledCloseButton";
import NoteInputField from "./elements/NoteInputField";
import {useMCDispatch, useScale} from "../../../../../PlayProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function OctaveNoteInput(): ReactJSXElement {

    const octaveNote: ScaleNote = useScale().octaveNote;
    const mcDispatch: Function = useMCDispatch();

    const [isRatio, setIsRatio] = useState<boolean>(!octaveNote.num.includes('.'));

    const convertOctaveNote = () => {
        mcDispatch({type: MCActions.CONVERT_OCTAVE_NOTE});
    }

    const editOctaveNote = (newNote: string) => {
        mcDispatch({type: MCActions.EDIT_OCTAVE_NOTE, noteValue: newNote});
    }

    return (
        <div className={'inline-flex'}>
            <div className={'relative'}>
                <NoteConverter
                    note={octaveNote}
                    isRatio={isRatio}
                    convertNote={convertOctaveNote}
                />
                <DisabledCloseButton className={'-top-1.5 -left-1.5'}/>
            </div>

            <NoteInputField
                noteValue={octaveNote.num}
                isRatio={isRatio}
                setIsRatio={setIsRatio}
                editNote={editOctaveNote}
            />

            <DisabledReorderIcon/>
        </div>
    );
}
