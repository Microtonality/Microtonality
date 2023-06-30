import * as React from "react";
import {useState} from "react";
import DisabledReorderIcon from "./elements/DisabledReorderIcon";
import BaseNoteConverter from "./elements/BaseNoteConverter";
import DisabledCloseButton from "../../../../elements/DisabledCloseButton";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ScaleNote} from "../../../../../../../utility/microtonal/notes";

interface BaseNoteInputProps {
    baseNote: ScaleNote;
    setBaseNote: (baseNote: ScaleNote) => void;
}

export default function BaseNoteInput(props: BaseNoteInputProps): ReactJSXElement {

    const [isRatio, setIsRatio] = useState<boolean>(!props.baseNote.num.includes('.'));

    return (
        <div className={`inline-flex my-1`}>
            <div className={'relative'}>
                <BaseNoteConverter
                    isRatio={isRatio}
                    setIsRatio={setIsRatio}
                    setBaseNote={props.setBaseNote}
                />
                <DisabledCloseButton className={'-top-1.5 -left-1.5'}/>
            </div>

            <input
                className={'settings-panel-input mx-px'}
                type={'string'}
                disabled={true}
                value={props.baseNote.num}
            />

            <DisabledReorderIcon/>
        </div>
    );
}
