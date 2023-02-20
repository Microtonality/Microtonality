import {Tooltip} from "@mui/material";
import * as React from "react";
import {useEffect, useRef} from "react";
import FrequencyBar from "../../synthesizer/FrequencyBar";

interface FrequencyBarButton {
    frequency: number,
    key?: string,
    active?: boolean
}

function FrequencyBarButton(props: FrequencyBarButton) {
    const updateAssignedKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {  };
    return <button
        aria-describedby={"simple-popover"}
        className={"btn w-8 h-8 font-agrandir text-black bg-gold border-b-2 border-r-2 border-black" +
            `${props.active ? 'uppercase' : "hover:bg-gray-200"} text-sm`}
        onClick={(e) => updateAssignedKey(e)}>
        {Math.round(props.frequency)}
        <br/>
        {props.key}
    </button>
}

function MIDINoteToFrequency(note: number) {
    return 0;
}

function FrequencyBarComponent(props: {
    keyMapping: Record<number, number>,
    notesPerOctave: 12,
    playMidiNote: Function,
    setKeyMapping: Function,
    octaveOffset: number
}) {

    let freqBarArr = []

    for (let key of Object.keys(props.keyMapping)) {
        freqBarArr.push
        (
            <Tooltip describeChild title={"asdf"} key={key}
                     placement="top">
                    <FrequencyBarButton frequency={MIDINoteToFrequency(octaveOffset * 12 + parseInt(key))} key={key}/>
            </Tooltip>
        )
    }

    return <div>{freqBarArr}</div>;
}

export default FrequencyBarComponent;
