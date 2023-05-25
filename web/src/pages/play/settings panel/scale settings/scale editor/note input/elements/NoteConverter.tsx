import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ScaleNote, CentNote} from "../../../../../../../utility/microtonal/notes";

interface NoteConverterProps {
    note: ScaleNote;
    isRatio: boolean;
    convertNote: Function;
}

// A user can convert from a ratio to a cent value and convert back.
// Converting from any cent to a ratio is not allowed.
export default function NoteConverter(props: NoteConverterProps) {

    const createRatioBox = (): ReactJSXElement => {

        if (!props.isRatio) {

            // If the current note is a cent note but does not have a previous ratio to convert to.
            if (props.note instanceof CentNote && props.note.prevRatio === '') {
                return (
                    <div className={'note-converter-box-inactive-disabled note-converter-box-l'}>
                        RATIO
                    </div>
                );
            }

            return (
                <div className={'note-converter-box-inactive note-converter-box-l'}
                     onClick={() => props.convertNote()}>
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
                     onClick={() => props.convertNote()}>
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
