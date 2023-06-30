import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ScaleNote} from "../../../../../../../../utility/microtonal/notes";
import {BaseCentNote} from "../../../../../../../../utility/microtonal/notes/CentNote";
import {BaseRatioNote} from "../../../../../../../../utility/microtonal/notes/RatioNote";

interface BaseNoteConverterProps {
    isRatio: boolean;
    setIsRatio: (val: boolean) => void;
    setBaseNote: (baseNote: ScaleNote) => void;
}

// Converting the base note just involves visually
// changing the note's value from '1/1' to '0.0'.
export default function BaseNoteConverter(props: BaseNoteConverterProps): ReactJSXElement {

    const convertBaseNote = (): void => {
        if (props.isRatio) {
            props.setBaseNote(BaseCentNote);
            props.setIsRatio(false);
            return;
        }

        props.setBaseNote(BaseRatioNote);
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
        <div className={'note-converter-container'}>
            {createRatioBox()}
            {createCentBox()}
        </div>
    );
}