import {Tooltip} from "@mui/material";
import * as React from "react";
import {useEffect, useRef} from "react";
import {KeyShortcut} from "../../utility/microtonal/PianoKeyMapping";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";

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
    midiReceiver: MidiReceiver,
    keyOffset: number,  // How many keys up should be displaying from the root key? Used for keyboard moving
}) {

    let freqBarArr = [];
    let reversedMapping = reverseMapping(props.keyMapping);
    console.log(reversedMapping);

    // If the user is advancing forward or backwards keys, we need to rotate the frequency bar buttons around
    let scaleOffset = null;
    // We might have to search a bit in case the current lowest key isn't bound to anything
    for (let i=0; i<props.scaleConfig.scale.notes.length; i++) {
        if (props.keyMapping[props.keyOffset + i] !== undefined) {
            scaleOffset = props.keyMapping[props.keyOffset + i];
            break;
        }
    }

    // Stop before the octave note
    for (let preScaleDegree = 0; preScaleDegree < props.scaleConfig.scale.notes.length; preScaleDegree++) {
        // Add the offset to rotate it
        let scaleDegree = (preScaleDegree + scaleOffset) % props.scaleConfig.scale.notes.length;
        // If we are rolling keys over, the upper keys should have their octave bumped up
        let octaveAdditive = Math.floor((preScaleDegree + scaleOffset) / props.scaleConfig.scale.notes.length);
        // Map the scale degree to the midi keyboard mapping
        let keyboardKeyNum = reversedMapping[scaleDegree];
        let keyboardKey;
        // If it has a mapping, get the MIDI note for it
        if (keyboardKeyNum === undefined) {
            keyboardKey = "None";
        } else {
            keyboardKey = (props.scaleConfig.rootKey + ((props.octaveOffset + octaveAdditive) * (props.scaleConfig.scale.notes.length - 1)) + keyboardKeyNum).toString();
        }

        freqBarArr.push
        (
            // <Tooltip describeChild title={"asdf"} key={i}
            //          placement="top">
                    <FrequencyBarButton frequency={props.midiReceiver.ScaleDegreeToFrequency(scaleDegree, props.octaveOffset + octaveAdditive)} keyMapping={keyboardKey} key={scaleDegree}/>
            // </Tooltip>
        )
    }

    return <div className="flex justify-center mt-[2%]">
        <div>
            {freqBarArr}
        </div>
        <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
            <button className="btn 2xl:h-8 2xl:w-8 xl:h-8 xl:w-8 lg:h-7 lg-w-7 md:h-7 md:w-7 sm:h-6 sm:w-6 xs:h-6 xs:w-6 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
        </Tooltip>
    </div>;
}

export default FrequencyBarComponent;
