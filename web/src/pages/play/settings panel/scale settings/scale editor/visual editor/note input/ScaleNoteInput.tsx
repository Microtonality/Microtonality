import * as React from "react";
import {useState} from "react";
import {ScaleNote} from "../../../../../../../utility/microtonal/notes";
import NoteInputField from "./elements/NoteInputField";
import NoteConverter from "./elements/NoteConverter";
import CloseButton from "../../../../elements/CloseButton";
import {MCActions} from "../../../../../Reducers";
import {useMCDispatch} from "../../../../../PlayProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface ScaleNoteInputProps {
    note: ScaleNote;
    noteIndex: number;
}

export default function ScaleNoteInput(props: ScaleNoteInputProps): ReactJSXElement {

    const mcDispatch: Function = useMCDispatch();

    const [isRatio, setIsRatio] = useState<boolean>(!props.note.num.includes('.'));

    const convertNote = (): void => {
        mcDispatch({type: MCActions.CONVERT_NOTE, noteIndex: props.noteIndex});
    }

    const deleteNote = (): void => {
        mcDispatch({type: MCActions.DELETE_NOTE, noteIndex: props.noteIndex});
    }

    const editNote = (newNote: string): void => {
        mcDispatch({type: MCActions.EDIT_NOTE, noteValue: newNote, noteIndex: props.noteIndex});
    }

    return (
        <div className={'inline-flex'}>
            <div className={'relative'}>
                <NoteConverter
                    note={props.note}
                    isRatio={isRatio}
                    convertNote={convertNote}
                />
                <CloseButton
                    className={'-top-1.5 -left-1.5'}
                    onClick={deleteNote}
                />
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
