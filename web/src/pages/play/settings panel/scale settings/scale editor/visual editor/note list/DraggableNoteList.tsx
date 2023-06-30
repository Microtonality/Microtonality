import * as React from "react";
import {ScaleNote} from "../../../../../../../utility/microtonal/notes";
import {Reorder} from "framer-motion";
import {Scale} from "../../../../../../../utility/microtonal/Scale";
import {MCActions} from "../../../../../Reducers";
import DraggableNote from "./DraggableNote";
import {useEffect, useRef, useState} from "react";
import {useMCDispatch, useScale} from "../../../../../PlayProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface DraggableNoteListProps {
    baseNote: ScaleNote;
}

export default function DraggableNoteList(props: DraggableNoteListProps): ReactJSXElement {

    const scale: Scale = useScale();
    const mcDispatch: Function = useMCDispatch();

    const [fixedNotes, setFixedNotes] = useState<ScaleNote[]>(scale.notes.slice(1));
    const listRef: React.MutableRefObject<HTMLUListElement> = useRef(null);

    // Necessary for some Framer animations and
    // to prevent scrolling to the top on update.
    // (versus updating with a key prop in the DOM like usual)
    useEffect(() => {
        setFixedNotes(scale.notes.slice(1));
    }, [scale]);

    const reorderScale = (): void => {
        if (notesAreUnchanged()) {
            return;
        }

        let newScale: Scale = {...scale, notes: [props.baseNote, ...fixedNotes]} as Scale;
        mcDispatch({type: MCActions.SET_SCALE, scale: newScale});
    }

    const notesAreUnchanged = (): boolean => {
        let currentFixedNotes: ScaleNote[] = scale.notes.slice(1);
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
            {fixedNotes.map((note: ScaleNote, i: number) => (
                <DraggableNote 
                    key={note.id} 
                    note={note} 
                    noteIndex={i + 1}
                    listRef={listRef}
                    reorderScale={reorderScale}
                />
            ))}
        </Reorder.Group>
    );
}