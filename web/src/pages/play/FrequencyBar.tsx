import {Tooltip} from "@mui/material";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {KeyShortcut} from "../../utility/microtonal/PianoKeyMapping";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";

interface FrequencyBarButton {
    frequency: number,
    keyMapping?: string,
    active?: boolean,
    index: number,
    length: number,
    divWidth: number
}

function FrequencyBarButton(props: FrequencyBarButton) {
    const updateAssignedKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {  };
    const wrapIndex = Math.floor(props.divWidth/40)-1

    return <button
        aria-describedby={"simple-popover"}
        className={"btn w-10 max-w-10 items-center justify-center md:p-0.5 p-0 font-agrandir text-black  border-b-2 border-r-2 border-black md:text-sm text-xs " +
            `${props.active ? 'bg-gold' : "bg-neutral-200 hover:bg-neutral-300"} ` + 
            `${ props.index === 0 || 
                props.index === wrapIndex + 1 || 
                props.index === wrapIndex * 2 + 2 
                ? 'rounded-l-md' : ''} ` + 
            `${ props.index === props.length || 
                props.index === wrapIndex || 
                props.index === wrapIndex * 2 + 1 
                ? 'rounded-r-md' : ''} `
        }
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

    //Stores width of frequency bar div for wrap styling
    const divRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number | null>(null);

    let debounceTimeout: ReturnType<typeof setTimeout>;
    
    function handleResize() {
        const div = divRef.current;
        clearTimeout(debounceTimeout);
    
        debounceTimeout = setTimeout(() => {
          setWidth(div.offsetWidth-44);
        }, 1);
    }
    
    //Updates width of freq bar on resize
    useEffect(() => {
        if (width === null) handleResize();
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    let freqBarArr = [];
    let reversedMapping = reverseMapping(props.keyMapping);

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
        let isActive;
        // If it has a mapping, get the MIDI note for it
        if (keyboardKeyNum === undefined) {
            keyboardKey = "‎"; //invisible character so the numbers in the frequency bar stay in line
            isActive = false;
        } else {
            keyboardKey = props.keyboardShortcuts[(keyboardKeyNum - props.keyOffset + (octaveAdditive * props.scaleConfig.scale.notes.length)) % props.keyboardShortcuts.length].key.toUpperCase();
            isActive = true;
        }

        freqBarArr.push
        (
            // <Tooltip describeChild title={"asdf"} key={i}
            //          placement="top">
                    <FrequencyBarButton 
                        frequency={props.midiReceiver.ScaleDegreeToFrequency(scaleDegree, props.octaveOffset + octaveAdditive)} 
                        keyMapping={keyboardKey} 
                        key={scaleDegree} 
                        active={isActive} 
                        index={preScaleDegree} 
                        length={props.scaleConfig.scale.notes.length - 1}
                        divWidth={width}
                    />
            // </Tooltip>
        )
    }

    return <div ref={divRef} className="w-full flex items-center justify-center mt-[6%]">
        <div  className={"flex flex-row justify-center flex-wrap"}>
            {freqBarArr}
        </div>
        <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
            <button className="btn min-w-[1.75rem] w-7 aspect-square bg-white text-black rounded-full hover:bg-gray-100 mx-2">?</button>
        </Tooltip>
    </div>;
}

export default FrequencyBarComponent;
