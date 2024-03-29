import * as React from "react";
import {DragControls, MotionValue, Reorder, useDragControls, useMotionValue} from "framer-motion";
import ScaleNoteInput from "../note input/ScaleNoteInput";
import {ScaleNote} from "../../../../../../../utility/microtonal/notes";
import {MutableRefObject, useState} from "react";
import ReorderIcon from "../note input/elements/ReorderIcon";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface DraggableNoteProps {
    note: ScaleNote;
    noteIndex: number;
    listRef: MutableRefObject<HTMLUListElement>;
    reorderScale: () => void;
}

export default function DraggableNote(props: DraggableNoteProps): ReactJSXElement {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragControls: DragControls = useDragControls();
    const yValue: MotionValue<number> = useMotionValue(0);

    const startDragging = (event: React.PointerEvent<HTMLDivElement>): void => {
        setIsDragging(true);
        dragControls.start(event);
    };

    const stopDragging = (): void => {
        setIsDragging(false);
        props.reorderScale();
    };

    return (
        <Reorder.Item
            value={props.note}
            style={{ y: yValue }}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={props.listRef}
            onDragEnd={() => stopDragging()}
            className={`inline-flex relative select-none my-1 ${(isDragging) ? 'z-10' : 'z-0'}`}
        >
            <ScaleNoteInput
                note={props.note}
                noteIndex={props.noteIndex}
            />
            <ReorderIcon
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                startDragging={startDragging}
            />
        </Reorder.Item>
    );
};