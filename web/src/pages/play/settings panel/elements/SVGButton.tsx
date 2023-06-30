import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import Animator from "./animations/Animator";
import {ScaleIn} from "./animations/Animations";

interface SVGButtonProps {
    className?: string;
    svg: SVGButtons;
    onClick: Function;
    disabled?: boolean;
    children?: ReactJSXElement | ReactJSXElement[];
}

export default function SVGButton(props: SVGButtonProps): ReactJSXElement {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            props.onClick();
            event.preventDefault();
        }
    }

    return (
        <Animator animation={ScaleIn}>
            <div
                className={`${props.className} relative settings-panel-svg-button-parent group ${props.disabled ? 'pointer-events-none' : ''}`}
                tabIndex={0}
                onClick={() => props.onClick()}
                onKeyDown={(e) => handleKeyDown(e)}
                onMouseLeave={(e) => e.currentTarget.blur()}
            >
                <svg
                    className={'settings-panel-svg-button'}
                    xmlns={'http://www.w3.org/2000/svg'}
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                >
                    {SVGButtonPaths(props.svg)}
                </svg>

                {props.children}

            </div>
        </Animator>
    );
}

export enum SVGButtons {
    pencilSquare,
    listBullet,
    arrowDownTray,
    cog6tooth,
    questionMarkCircle,
}

// All SVG paths from https://heroicons.com
export const SVGButtonPaths = (buttonType: SVGButtons): ReactJSXElement[] => {

    let path: ReactJSXElement[] = [];

    switch (buttonType) {
        case SVGButtons.pencilSquare: {
            path.push(pathBase('M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'));
            break;
        }
        case SVGButtons.listBullet: {
            path.push(pathBase('M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'));
            break;
        }
        case SVGButtons.arrowDownTray: {
            path.push(pathBase('M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'));
            break;
        }
        case SVGButtons.cog6tooth: {
            path.push(pathBase('M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'));
            path.push(pathBase('M15 12a3 3 0 11-6 0 3 3 0 016 0z'));
            break;
        }
        case SVGButtons.questionMarkCircle: {
            path.push(pathBase('M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'));
        }
    }

    return path;
}

const pathBase = (d: string): ReactJSXElement => {
    return (
        <path
            d={d}
            key={d}
        />
    );
}