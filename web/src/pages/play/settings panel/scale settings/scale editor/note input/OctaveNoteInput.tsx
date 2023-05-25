import * as React from "react";
import {useState} from "react";
import {MCActions} from "../../../../Reducers";
import {ScaleNote} from "../../../../../../utility/microtonal/notes";
import DisabledReorderIcon from "./elements/DisabledReorderIcon";
import NoteConverter from "./elements/NoteConverter";
import DisabledDeleteNoteButton from "./elements/DisabledDeleteNoteButton";
import NoteInputField from "./elements/NoteInputField";

interface OctaveNoteInputProps {
    note: ScaleNote,
    mcDispatch: Function;
}

export default function OctaveNoteInput(props: OctaveNoteInputProps) {

    const [isRatio, setIsRatio] = useState<boolean>(!props.note.num.includes('.'));

    const convertOctaveNote = () => {
        props.mcDispatch({type: MCActions.CONVERT_OCTAVE_NOTE});
    }

    const editOctaveNote = (newNote: string) => {
        props.mcDispatch({type: MCActions.EDIT_OCTAVE_NOTE, noteValue: newNote});
    }

    return (
        <div className={'inline-flex'}>
            <div className={'relative'}>
                <NoteConverter
                    note={props.note}
                    isRatio={isRatio}
                    convertNote={convertOctaveNote}
                />
                <DisabledDeleteNoteButton/>
            </div>

            <NoteInputField
                noteValue={props.note.num}
                isRatio={isRatio}
                setIsRatio={setIsRatio}
                editNote={editOctaveNote}
            />

            <DisabledReorderIcon/>
        </div>
    );
}
