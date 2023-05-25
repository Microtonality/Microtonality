import * as React from "react";
import {reorderIconDiv, reorderIconSVG} from "../../note list/ReorderIcon";

export default function DisabledReorderIcon() {
    return (
        <div className={`${reorderIconDiv} border-black`}>
            <svg className={`${reorderIconSVG} stroke-black`} xmlns={'http://www.w3.org/2000/svg'}>
                <line x1={1} y1={1} x2={11} y2={1} strokeLinecap={'round'} strokeLinejoin={'round'}/>
                <line x1={1} y1={6} x2={11} y2={6} strokeLinecap={'round'} strokeLinejoin={'round'}/>
                <line x1={1} y1={11} x2={11} y2={11} strokeLinecap={'round'} strokeLinejoin={'round'}/>
            </svg>
        </div>
    );
}