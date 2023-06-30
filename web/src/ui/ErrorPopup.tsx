import * as React from "react";
import {useErrorMsg, useSetErrorMsg} from "../pages/play/PlayProvider";
import Animator from "../pages/play/settings panel/elements/animations/Animator";
import {EnterTopExitTop} from "../pages/play/settings panel/elements/animations/Animations";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export const HIDE_ERROR: string = '';

export default function ErrorPopup(): ReactJSXElement {

    let errorMsg: string = useErrorMsg();
    let errorMsgDispatch: Function = useSetErrorMsg();

    const closeButtonOffset: number = 4;
    const closeButtonSize: number = 14;

    const hideError = (): void => {
        errorMsgDispatch(HIDE_ERROR);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            hideError();
            event.preventDefault();
        }
    }

    return (
        <Animator
            className={'absolute flex justify-center w-full p-12 z-10'}
            animation={EnterTopExitTop}
            visible={errorMsg !== HIDE_ERROR}
        >
            <div className={'inline-flex max-w-4xl max-h-96 bg-rederror dark:bg-black rounded-lg shadow-lg shadow-black'}>

                <strong className={'whitespace-pre-line text-xl px-4 py-3 overflow-y-scroll text-black dark:text-rederror font-agrandir font-black'}>
                    {errorMsg}
                </strong>

                {/*Close Button Column*/}
                <div
                    className={'px-3.5 py-4 bg-neutral-200 rounded-r-lg cursor-pointer group hover:bg-bgdark dark:bg-bgdark dark:hover:bg-bglight'}
                    tabIndex={0}
                    onClick={() => hideError()}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onMouseLeave={(e) => e.currentTarget.blur()}
                >
                    <svg
                        className={'w-6 h-6 stroke-black group-hocus:stroke-neutral-200 dark:stroke-neutral-200 dark:group-hocus:stroke-black outline-0'}
                        xmlns={'http://www.w3.org/2000/svg'}
                        strokeWidth={'3'}
                        strokeLinecap={'round'}
                    >
                        <line x1={closeButtonOffset} y1={closeButtonOffset + closeButtonSize} x2={closeButtonOffset + closeButtonSize} y2={closeButtonOffset} />
                        <line x1={closeButtonOffset + closeButtonSize} y1={closeButtonOffset + closeButtonSize} x2={closeButtonOffset} y2={closeButtonOffset} />
                    </svg>
                </div>

            </div>
        </Animator>
    );
}
