import * as React from "react";
import {deleteNoteSVG} from "./DeleteNoteButton";

export default function DisabledDeleteNoteButton() {

    return (
        <svg className={`${deleteNoteSVG} bg-bglight`} xmlns={'http://www.w3.org/2000/svg'}>
            <line x1={4} y1={4} x2={8} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
            <line x1={8} y1={4} x2={4} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
        </svg>
    );
}