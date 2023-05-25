import * as React from "react";

interface ErrorPopupProps {
    errorMsg: string;
    displayErrorMsg: Function;
}

export const HIDE_ERROR: string = '';

export default function ErrorPopup(props: ErrorPopupProps) {

    const hidden: string = (props.errorMsg === HIDE_ERROR) ? 'hidden' : '';
    const cbOffset: number = 4;
    const cbSize: number = 14;

    return (
        <div className={`${hidden} absolute w-full flex justify-center p-12`}>
            <div className={'z-10 bg-rederror dark:bg-black inline-flex max-w-4xl max-h-96 rounded-lg shadow-lg shadow-black'}>

                {/*Message*/}
                <strong className={'whitespace-pre-line text-black dark:text-rederror text-xl px-4 py-3 overflow-y-scroll font-agrandir font-black'}>
                    {props.errorMsg}
                </strong>

                {/*Close Button*/}
                <div className={'px-3.5 py-4 bg-neutral-200 rounded-r-lg cursor-pointer group hover:bg-bgdark dark:bg-bgdark dark:hover:bg-bglight'}
                     onClick={() => props.displayErrorMsg(HIDE_ERROR)}
                >
                        <svg className={'w-6 h-6 stroke-black group-hover:stroke-neutral-200 dark:stroke-neutral-200 dark:group-hover:stroke-black'}
                            xmlns={'http://www.w3.org/2000/svg'}
                             strokeWidth={'3'}
                             strokeLinecap={'round'}
                        >
                            <line x1={cbOffset} y1={cbOffset + cbSize} x2={cbOffset + cbSize} y2={cbOffset} />
                            <line x1={cbOffset + cbSize} y1={cbOffset + cbSize} x2={cbOffset} y2={cbOffset} />
                        </svg>
                </div>

            </div>
        </div>
    );
}
