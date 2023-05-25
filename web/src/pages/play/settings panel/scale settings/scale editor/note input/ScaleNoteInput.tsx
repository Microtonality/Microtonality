import * as React from "react";
import {useState} from "react";
import {ScaleNote} from "../../../../../../utility/microtonal/notes";
import NoteInputField from "./elements/NoteInputField";
import NoteConverter from "./elements/NoteConverter";
import DeleteNoteButton from "./elements/DeleteNoteButton";
import {MCActions} from "../../../../Reducers";

interface ScaleNoteInputProps {
    note: ScaleNote;
    noteIndex: number;
    mcDispatch: Function;
}

export default function ScaleNoteInput(props: ScaleNoteInputProps) {

    const [isRatio, setIsRatio] = useState<boolean>(!props.note.num.includes('.'));

    const convertNote = () => {
        props.mcDispatch({type: MCActions.CONVERT_NOTE, noteIndex: props.noteIndex});
    }

    const deleteNote = () => {
        props.mcDispatch({type: MCActions.DELETE_NOTE, noteIndex: props.noteIndex});
    }

    const editNote = (newNote: string) => {
        props.mcDispatch({type: MCActions.EDIT_NOTE, noteValue: newNote, noteIndex: props.noteIndex});
    }

    return (
        <div className={'inline-flex'}>
            <div className={'relative'}>
                <NoteConverter
                    note={props.note}
                    isRatio={isRatio}
                    convertNote={convertNote}
                />
                <DeleteNoteButton deleteNote={deleteNote}/>
            </div>

            <NoteInputField
                noteValue={props.note.num}
                isRatio={isRatio}
                setIsRatio={setIsRatio}
                editNote={editNote}
            />

            {/* ReorderIcon is found in: scale editor/note list/DraggableNote.tsx */}
        </div>
    );
}
