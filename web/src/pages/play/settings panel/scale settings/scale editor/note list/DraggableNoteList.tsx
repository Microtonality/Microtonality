import * as React from "react";
import {RatioNote, ScaleNote} from "../../../../../../utility/microtonal/notes";
import {Reorder} from "framer-motion";
import {Scale} from "../../../../../../utility/microtonal/Scale";
import {MCActions} from "../../../../Reducers";
import DraggableNote from "./DraggableNote";
import {useEffect, useRef, useState} from "react";

interface DraggableNoteListProps {
    scale: Scale;
    mcDispatch: Function;
}

export default function DraggableNoteList(props: DraggableNoteListProps) {

    const [fixedNotes, setFixedNotes] = useState<ScaleNote[]>(props.scale.notes.slice(1));
    const listRef: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        setFixedNotes(props.scale.notes.slice(1));
    }, [props.scale]);

    const reorderScale = () => {
        if (notesAreUnchanged()) {
            return;
        }

        let newScale: Scale = {...props.scale, notes: [new RatioNote('1/1'), ...fixedNotes]} as Scale;
        props.mcDispatch({type: MCActions.SET_SCALE, scale: newScale});
    }

    const notesAreUnchanged = (): boolean => {
        let currentFixedNotes = props.scale.notes.slice(1);
        for (let i = 0; i < fixedNotes.length; i++) {
            if (fixedNotes.at(i).id !== currentFixedNotes.at(i).id) {
                return false;
            }
        }

        return true;
    }

    return (
        <Reorder.Group
            className={'select-none'}
            axis={'y'}
            layoutScroll
            ref={listRef}
            values={fixedNotes}
            onReorder={setFixedNotes}
        >
            {fixedNotes.map((note, i) => (
                <DraggableNote 
                    key={note.id} 
                    note={note} 
                    noteIndex={i + 1}
                    listRef={listRef}
                    mcDispatch={props.mcDispatch}
                    reorderScale={reorderScale}
                />
            ))}
        </Reorder.Group>
    );
}