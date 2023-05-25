import Button from "../../../../../ui/Button";
import SettingsFieldTitle from "../../SettingsFieldTitle";
import OctaveNoteInput from "./note input/OctaveNoteInput";
import * as React from "react";
import BaseNoteInput from "./note input/BaseNoteInput";
import {ScaleNote} from "../../../../../utility/microtonal/notes";
import {MCActions} from "../../../Reducers";
import {Scale} from "../../../../../utility/microtonal/Scale";
import DraggableNoteList from "./note list/DraggableNoteList";

interface ScaleEditorProps {
    scale: Scale;
    mcDispatch: Function;
}

export default function ScaleEditor(props: ScaleEditorProps) {

    // Insert a new note at the end of the scale,
    // averaging the last note and the octave note.
    const handleAddNote = () => {
        // Average the last note in the scale and the octave note.
        let notes: ScaleNote[] = props.scale.notes;
        let note: ScaleNote = ScaleNote.averageNotes(notes[notes.length - 1], props.scale.octaveNote);

        props.mcDispatch({type: MCActions.ADD_NOTE, note: note});
    }

    return (
        <div className={'flex flex-col'}>

            <SettingsFieldTitle text={'SCALE EDITOR'} />

            <Button
                text={'ADD NOTE'}
                onClick={() => handleAddNote()}
            />

            {/* Notes */}
            <div className={'mt-1.5'}>
                <BaseNoteInput/>

                <DraggableNoteList
                    scale={props.scale}
                    mcDispatch={props.mcDispatch}
                />

                <div className={'mt-1'} key={props.scale.octaveNote.id}>
                    <SettingsFieldTitle text={'OCTAVE NOTE'} />
                    <OctaveNoteInput
                        note={props.scale.octaveNote}
                        mcDispatch={props.mcDispatch}
                    />
                </div>
            </div>

        </div>
    );
}