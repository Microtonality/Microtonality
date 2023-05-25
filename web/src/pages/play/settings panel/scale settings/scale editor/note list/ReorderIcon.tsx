import * as React from "react";

interface ReorderIconProps {
    isDragging: boolean;
    setIsDragging: (val:boolean) => void;
    startDragging: (event: React.PointerEvent<HTMLDivElement>) => void;
}

export const reorderIconDiv: string = 'ml-px my-1 p-1.5 touch-none border-2 rounded-md bg-bglight group hover:border-black dark:bg-bgdark';
export const reorderIconSVG: string = 'w-3 h-3 stroke-2 group-hover:stroke-black';

export default function ReorderIcon(props: ReorderIconProps) {

    const notDraggingDiv: string = 'cursor-grab border-gold';
    const notDraggingSVG: string = 'stroke-gold';
    const draggingDiv: string = 'cursor-grabbing border-black';
    const draggingSVG: string = 'stroke-black';

    let curDiv: string = (!props.isDragging) ? notDraggingDiv : draggingDiv;
    let curSVG: string = (!props.isDragging) ? notDraggingSVG : draggingSVG;

    return (
        <div className={`${reorderIconDiv} ${curDiv}`}
             onPointerDown={(e) => props.startDragging(e)}
             onPointerUp={() => props.setIsDragging(false)}
        >
            <svg className={`${reorderIconSVG} ${curSVG}`} xmlns={'http://www.w3.org/2000/svg'}>
                <line x1={1} y1={1} x2={11} y2={1} strokeLinecap={'round'} strokeLinejoin={'round'}/>
                <line x1={1} y1={6} x2={11} y2={6} strokeLinecap={'round'} strokeLinejoin={'round'}/>
                <line x1={1} y1={11} x2={11} y2={11} strokeLinecap={'round'} strokeLinejoin={'round'}/>
            </svg>
        </div>
    );
}