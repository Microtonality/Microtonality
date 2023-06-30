import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ScaleNote, CentNote} from "../../../../../../../../utility/microtonal/notes";

interface NoteConverterProps {
    note: ScaleNote;
    isRatio: boolean;
    convertNote: Function;
}

// A user can convert from a ratio to a cent value and convert back.
// Converting from any cent to a ratio is not allowed.
export default function NoteConverter(props: NoteConverterProps): ReactJSXElement {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLOrSVGElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            props.convertNote();
            event.preventDefault();
        }
    }

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
                     tabIndex={0}
                     onClick={() => props.convertNote()}
                     onKeyDown={handleKeyDown}
                >
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
                <div
                    className={'note-converter-box-inactive note-converter-box-r'}
                    tabIndex={0}
                    onClick={() => props.convertNote()}
                    onKeyDown={handleKeyDown}
                >
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
