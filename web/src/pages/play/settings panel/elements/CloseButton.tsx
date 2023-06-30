import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface CloseButtonProps {
    className?: string;
    onClick: () => void;
}

export default function CloseButton(props: CloseButtonProps): ReactJSXElement {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLOrSVGElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            props.onClick();
            event.preventDefault();
        }
    }

    return (
        <svg className={`${props.className} ${deleteNoteSVG} cursor-pointer bg-gold hocus:stroke-gold hocus:bg-black outline-none`}
             xmlns={'http://www.w3.org/2000/svg'}
             tabIndex={0}
             onClick={props.onClick}
             onKeyDown={handleKeyDown}
        >
            <line x1={4} y1={4} x2={8} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
            <line x1={8} y1={4} x2={4} y2={8} strokeLinecap={'round'} strokeLinejoin={'round'}/>
        </svg>
    );
}

export const deleteNoteSVG: string = 'absolute w-4 h-4 stroke-black stroke-2 border-2 border-black rounded-full';