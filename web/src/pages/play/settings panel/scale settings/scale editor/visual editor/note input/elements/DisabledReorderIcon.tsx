import * as React from "react";
import {reorderIconDiv, reorderIconSVG} from "./ReorderIcon";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function DisabledReorderIcon(): ReactJSXElement {
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