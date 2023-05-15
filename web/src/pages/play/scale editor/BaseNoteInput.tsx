import * as React from "react";
import {useState} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

// Notes on this scale note input:
// The hamburger and delete buttons are inaccessible and black.
// The converter box can be used at any time to change the note value between '0.0' and '1/1'.
// The number input field is disabled.

export default function BaseNoteInput() {

    const [noteValue, setNoteValue] = useState<string>('1/1');
    const [isRatio, setIsRatio] = useState<boolean>(true);

    const convertBaseNote = (): void => {
        if (isRatio) {
            setNoteValue('0.0');
            setIsRatio(false);
            return;
        }
        setNoteValue('1/1');
        setIsRatio(true);
    }

    const createConverterBox = (): ReactJSXElement[] => {

        let notSelected: string = "cursor-pointer w-[50%] h-full bg-white";
        let selected: string = "cursor-default w-[50%] h-full bg-gold";
        let leftBorder: string = "rounded-l-md border-l-[2px] border-black pt-[4%] min-w-[3rem]";
        let rightBorder: string = "rounded-r-md border-l-[2px] border-black pt-[4%] min-w-[3rem]";

        let centNotSelected: string = notSelected + ' ' + leftBorder;
        let centSelected: string = selected + ' ' + leftBorder;
        let ratioNotSelected: string = notSelected + ' ' + rightBorder;
        let ratioSelected: string = selected + ' ' + rightBorder;

        let boxJSX: ReactJSXElement[] = [];
        if (isRatio) {
            boxJSX.push(
                <div onClick={() => convertBaseNote()} className={centNotSelected} key={0}>
                    CENTS
                </div>
            );
            boxJSX.push(
                <div className={ratioSelected} key={1}>
                    RATIO
                </div>
            );
        }
        else {
            boxJSX.push(
                <div className={centSelected} key={0}>
                    CENTS
                </div>
            );
            boxJSX.push(
                <div onClick={() => convertBaseNote()} className={ratioNotSelected} key={1}>
                    RATIO
                </div>
            );
        }

        return boxJSX;
    }

    return (
        <div className="inline-flex items-center mx-[1%] my-[2.5%] w-[95%]">

            <svg width="25" height="25" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <line y1="0.5" x2="12" y2="0.5" stroke="black"/>
                <line y1="10.5" x2="12" y2="10.5" stroke="black"/>
                <line y1="5.5" x2="12" y2="5.5" stroke="black"/>
            </svg>

            <label className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                <input type="checkbox" checked={isRatio} className="hidden peer" readOnly={true}/>
                {createConverterBox()}
            </label>

            <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                <input type="string" disabled={true} value={noteValue} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
            </div>

            <svg width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="black" strokeWidth="2"/>
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 -0.698927 0.715193 0.698927 2.02332 16.1421)" stroke="black" strokeWidth="2"/>
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="black" strokeWidth="2"/>
                <line y1="-1" x2="20.2341" y2="-1" transform="matrix(0.715193 0.698927 -0.715193 0.698927 1 2)" stroke="black" strokeWidth="2"/>
            </svg>

        </div>
    );
}
