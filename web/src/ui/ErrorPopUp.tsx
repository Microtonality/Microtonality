import * as React from "react";
import {useEffect, useState} from "react";

interface ErrorPopUpProps {
    errorMsg: string,
}

export const HIDE_ERROR: string = "";

export default function ErrorPopUp(props: ErrorPopUpProps) {

    const [msg, setMsg] = useState<string>(HIDE_ERROR);
    const offset = 4;
    const size = 14;

    useEffect(() => {
        setMsg(props.errorMsg);
    }, [props.errorMsg]);

    return (
        <div className={((msg === HIDE_ERROR) ? "hidden " : "") + "absolute w-full flex justify-center"}>
            <div className="z-10 -mt-6 bg-[#c91a1a] inline-flex max-w-4xl max-h-96 rounded-lg shadow-lg shadow-black">

                {/*Message*/}
                <strong className="whitespace-pre-line text-neutral-100 px-6 py-4 overflow-scroll font-agrandir-wide font-black">
                    {msg}
                </strong>

                {/*Close Button*/}
                <div className="bg-neutral-200 hover:invert rounded-r-lg cursor-pointer" onClick={() => setMsg(HIDE_ERROR)}>
                    <div className="px-3.5 py-4 h-0">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             fill="black"
                             stroke="black"
                             strokeWidth="3"
                             strokeLinecap="round"
                             width={"1.4rem"}
                             height={"1.4rem"}>
                            <line x1={offset} y1={offset + size} x2={offset + size} y2={offset} />
                            <line x1={offset + size} y1={offset + size} x2={offset} y2={offset} />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
}
