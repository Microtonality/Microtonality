import * as React from "react";
import {useState} from "react";
import DisabledReorderIcon from "./elements/DisabledReorderIcon";
import BaseNoteConverter from "./elements/BaseNoteConverter";
import DisabledDeleteNoteButton from "./elements/DisabledDeleteNoteButton";

export default function BaseNoteInput() {

    const [noteValue, setNoteValue] = useState<string>('1/1');
    const [isRatio, setIsRatio] = useState<boolean>(true);

    return (
        <div className={`inline-flex my-1`}>
            <div className={'relative'}>
                <BaseNoteConverter
                    isRatio={isRatio}
                    setIsRatio={setIsRatio}
                    setNoteValue={setNoteValue}
                />
                <DisabledDeleteNoteButton/>
            </div>

            <input
                disabled={true}
                type={'string'}
                value={noteValue}
                className={'settings-panel-input mx-px'}
            />

            <DisabledReorderIcon/>
        </div>
    );
}
