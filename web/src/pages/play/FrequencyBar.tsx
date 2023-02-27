import {Tooltip} from "@mui/material";
import * as React from "react";
import {useEffect, useRef} from "react";
import {KeyShortcut} from "../../utility/microtonal/PianoKeyMapping";
import {ScaleConfig} from "../../utility/MicrotonalConfig";

interface FrequencyBarButton {
    frequency: number,
    keyMapping?: string,
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
        {props.keyMapping}
    </button>
}

const reverseMapping = (mapping: Record<number, number>) => {
    let final: Record<number, number> = {};
    for (let key in mapping) {
        final[mapping[key]] = Number(key);
    }
    return final;
}

function FrequencyBarComponent(props: {
    keyMapping: Record<number, number>,
    scaleConfig: ScaleConfig,
    playMidiNote: Function,
    setKeyMapping: Function,
    octaveOffset: number,
    keyboardShortcuts: Array<KeyShortcut>
}) {

    let freqBarArr = [];
    let reversedMapping = reverseMapping(props.keyMapping);
    console.log(reversedMapping);

    for (let scaleDegree=0; scaleDegree<props.scaleConfig.scale.notes.length; scaleDegree++) {
        // Todo: Needs to be swapped for the actual freq calc
        let freq = props.scaleConfig.scale.scaleDegreeToNote(scaleDegree).multiplier * 100;
        let keyboardKeyNum = props.keyMapping[scaleDegree];
        let keyboardKey;
        if (keyboardKeyNum == undefined) {
            keyboardKey = "None";
        } else {
            keyboardKey = keyboardKeyNum.toString()
        }
        freqBarArr.push
        (
            // <Tooltip describeChild title={"asdf"} key={i}
            //          placement="top">
                    <FrequencyBarButton frequency={freq} keyMapping={keyboardKey} key={scaleDegree}/>
            // </Tooltip>
        )
    }

    return <div>
        <div>
            {freqBarArr}
        </div>
        <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
            <button className="btn 2xl:h-8 2xl:w-8 xl:h-8 xl:w-8 lg:h-7 lg-w-7 md:h-7 md:w-7 sm:h-6 sm:w-6 xs:h-6 xs:w-6 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
        </Tooltip>
    </div>;
}

export default FrequencyBarComponent;
