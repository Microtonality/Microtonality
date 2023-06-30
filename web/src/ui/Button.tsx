import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface ButtonProps {
    onClick: (event: any) => void;
    text: string;
    disabled?: boolean;
    className?: string;
}

export default function Button(props: ButtonProps): ReactJSXElement {
    return(
        <button
            disabled={props.disabled}
            className={`${props.className} settings-panel-button`}
            onClick={props.onClick}
            onMouseOut={(e) => e.currentTarget.blur()}
        >
            {props.text}
        </button>
    );
}