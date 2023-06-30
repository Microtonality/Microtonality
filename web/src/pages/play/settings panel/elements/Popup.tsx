import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface PopupProps {
    text: string;
}

export default function Popup(props: PopupProps): ReactJSXElement {
    return (
        <div className={'px-2 py-1 text-white dark:text-neutral-200 select-none font-agrandir-wide border border-gold dark:border-black rounded bg-bglight'}>
            {props.text}
        </div>
    );
}
