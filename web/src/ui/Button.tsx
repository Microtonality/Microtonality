import * as React from "react";
import {MutableRefObject, useRef} from "react";

interface ButtonProps {
    onClick: (event: any) => void;
    text: string;
    disabled?: boolean;
    className?: string;
}

export default function Button(props: ButtonProps) {

    const ref: MutableRefObject<HTMLButtonElement> = useRef(null);

    return(
        <button
            ref={ref}
            disabled={props.disabled}
            className={`${props.className} settings-panel-button`}
            onClick={props.onClick}
            onMouseOut={() => ref.current.blur()}
        >
            {props.text}
        </button>
    );
}