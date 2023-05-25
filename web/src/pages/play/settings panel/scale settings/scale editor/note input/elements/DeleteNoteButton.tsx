import * as React from "react";

interface DeleteNoteButtonProps {
    deleteNote: () => void;
}

export const deleteNoteSVG: string = 'absolute w-4 h-4 -top-1.5 -left-1.5 stroke-black stroke-2 border-2 border-black rounded-full';

export default function DeleteNoteButton(props: DeleteNoteButtonProps) {

    return (
        <svg className={`${deleteNoteSVG} cursor-pointer bg-gold hover:stroke-gold hover:bg-black`}
             xmlns={'http://www.w3.org/2000/svg'}
             onClick={() => props.deleteNote()}
        >
            <line x1={4} y1={4} x2={8} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
            <line x1={8} y1={4} x2={4} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
        </svg>
    );
}