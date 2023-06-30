import * as React from "react";
import SVGButton, {SVGButtons} from "./SVGButton";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface SaveButtonProps {
    original: string;
    current: string;
    onClick: () => void;
}

export default function SaveButton(props: SaveButtonProps): ReactJSXElement {

    const disabled: boolean = props.original === props.current;

    return (
        <SVGButton
            svg={SVGButtons.arrowDownTray}
            onClick={props.onClick}
            disabled={disabled}
        >
            {/* Small bubble in the top left that lets the user know they can click. */}
            {!disabled &&
                <div
                    className={'absolute animate-scale-in -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-gold dark:bg-black border border-black dark:border-gold'}
                />
            }
        </SVGButton>
    );
}