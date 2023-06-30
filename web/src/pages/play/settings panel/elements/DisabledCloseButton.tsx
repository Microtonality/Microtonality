import * as React from "react";
import {deleteNoteSVG} from "./CloseButton";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface DisabledCloseButtonProps {
    className: string;
}

export default function DisabledCloseButton(props: DisabledCloseButtonProps): ReactJSXElement {
    return (
        <svg className={`${props.className} ${deleteNoteSVG} bg-bglight`} xmlns={'http://www.w3.org/2000/svg'}>
            <line x1={4} y1={4} x2={8} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
            <line x1={8} y1={4} x2={4} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
        </svg>
    );
}