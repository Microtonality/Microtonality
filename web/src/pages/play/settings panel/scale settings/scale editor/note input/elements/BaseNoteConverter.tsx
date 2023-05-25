import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface BaseNoteConverterProps {
    isRatio: boolean;
    setIsRatio: (val: boolean) => void;
    setNoteValue: (val: string) => void;
}

// Converting the base note just involves visually
// changing the note's value from '1/1' to '0.0'.
export default function BaseNoteConverter(props: BaseNoteConverterProps) {

    const convertBaseNote = (): void => {
        if (props.isRatio) {
            props.setNoteValue('0.0');
            props.setIsRatio(false);
            return;
        }

        props.setNoteValue('1/1');
        props.setIsRatio(true);
    }

    const createRatioBox = (): ReactJSXElement => {

        if (!props.isRatio) {
            return (
                <div className={'note-converter-box-inactive note-converter-box-l'}
                     onClick={() => convertBaseNote()}>
                    RATIO
                </div>
            );
        }

        return (
            <div className={'note-converter-box-active note-converter-box-l'}>
                RATIO
            </div>
        );
    }

    const createCentBox = (): ReactJSXElement => {

        if (props.isRatio) {
            return (
                <div className={'note-converter-box-inactive note-converter-box-r'}
                     onClick={() => convertBaseNote()}>
                    CENT
                </div>
            );
        }

        return (
            <div className={'note-converter-box-active note-converter-box-r'}>
                CENT
            </div>
        );
    }

    return (
        <div className={'note-converter-box-container'}>
            {createRatioBox()}
            {createCentBox()}
        </div>
    );
}