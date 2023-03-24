import {Tooltip} from "@mui/material";
import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import {KeyShortcut} from "../../utility/microtonal/PianoKeyMapping";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {MCActions} from "./Reducers";

interface FrequencyBarButton {
    frequency: number,
    keyMapping?: string,
    active?: boolean,
    scaleDegree: number,
    isEditing: boolean,
    onClick: (index: number) => void
}

function FrequencyBarButton(props: FrequencyBarButton) {
    return <button
        aria-describedby={"simple-popover"}
        className={"flex flex-1 flex-col items-center text-center justify-center md:p-2 p-0.5 font-agrandir " +
            "text-black bg-gold border-r-2 border-neutral-500 last:border-r-0 hover:bg-gray-200 " +
            `${props.active ? 'bg-gold' : "bg-white"} md:text-sm text-xs`}
        onClick={e => props.onClick(props.isEditing ? null : props.scaleDegree)}>
        <span>{Math.round(props.frequency)}</span>
        <span className={(props.active || props.isEditing ? "" : "opacity-0")}
            >{props.isEditing ? "???" : props.keyMapping}</span>
    </button>
}

const reverseMapping = (mapping: Record<number, number>) => {
    let final: Record<number, number> = {};
    for (let key in mapping) {
        final[mapping[key]] = Number(key);
    }
    return final;
}

// Handle modulo with negative numbers
const modulo = (value: number, divisor: number) => {
    while (value < 0) {
        value += divisor;
    }
    return value % divisor;
}

const scaleDegreeToKeyIndex = (reversedMapping: Record<number, number> , scaleDegree: number, keyOffset: number, scaleLength: number, keysPerOctave: number) => {
    let keyboardKeyNum = reversedMapping[scaleDegree];
    if (keyboardKeyNum === undefined) {
        return null;
    }
    return modulo(keyboardKeyNum - keyOffset, scaleLength) % keysPerOctave;
}


function FrequencyBarComponent(props: {
    keyMapping: Record<number, number>,
    scaleConfig: ScaleConfig,
    playMidiNote: Function,
    setKeyMapping: Function,
    octaveOffset: number,
    keyboardShortcuts: Array<KeyShortcut>
    midiReceiver: MidiReceiver,
    mcDispatch: Function,
    keyOffset: number,  // How many keys up should be displaying from the root key? Used for keyboard moving
}) {

    const [editingNote, setEditingNote] = useState<number>(null);

    let freqBarArr = [];
    let reversedMapping = reverseMapping(props.keyMapping);

    useEffect(() => {
        if (editingNote === null) {
            return;
        }
        const onKeyPress = (event: KeyboardEvent) => {
            if (editingNote !== null) {
                let keyIndex = -1;
                // Validate note is currently on the keyboard
                for (let i=0; i<props.keyboardShortcuts.length; i++) {
                    let shortcut = props.keyboardShortcuts[i];
                    if (shortcut.key === event.key.toLowerCase()) {
                        keyIndex = i;
                        break;
                    }
                }
                if (keyIndex === -1) {
                    setEditingNote(null);
                    document.removeEventListener("keydown", onKeyPress);
                    return;
                }
                // We now have keyIndex and editingNote (scale degree), unset the current note with this degree and then
                // set the new key to that note
                let oldKey = scaleDegreeToKeyIndex(reversedMapping, editingNote, props.keyOffset, props.scaleConfig.scale.notes.length, props.scaleConfig.keysPerOctave);
                let newKey = modulo(keyIndex + props.keyOffset, props.scaleConfig.keysPerOctave);
                if (oldKey !== null) {
                    let correctedOldKey = modulo(oldKey + props.keyOffset, props.scaleConfig.keysPerOctave);
                    console.log(`Unsetting scaleDegree ${editingNote} bound to ${oldKey} ${props.keyboardShortcuts[oldKey].key} which is key mapping ${correctedOldKey}`)
                    props.mcDispatch({type: MCActions.UNSET_KEYBIND, keyIndex: correctedOldKey});
                }
                console.log(oldKey, newKey);
                props.mcDispatch({type: MCActions.SET_KEYBIND, keyIndex: newKey, scaleDegree: editingNote})

                setEditingNote(null);
                document.removeEventListener("keydown", onKeyPress);
            }
        }
        document.addEventListener("keydown", onKeyPress);
        return () => document.removeEventListener("keydown", onKeyPress)
    }, [editingNote]);

    console.log(props.keyMapping, reversedMapping)

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
        let keyIndex = scaleDegreeToKeyIndex(reversedMapping, scaleDegree, props.keyOffset, props.scaleConfig.scale.notes.length, props.scaleConfig.keysPerOctave);
        if (keyIndex === null) {
            keyboardKey = "None";
        } else {
            keyboardKey = props.keyboardShortcuts[keyIndex].key.toUpperCase();
        }

        console.log(`prescale ${preScaleDegree} -> scaleDegree ${scaleDegree} mapped to key index ${keyIndex} ${keyboardKey}`)

        freqBarArr.push
        (
            // <Tooltip describeChild title={"asdf"} key={i}
            //          placement="top">
                    <FrequencyBarButton frequency={props.midiReceiver.ScaleDegreeToFrequency(scaleDegree, props.octaveOffset + octaveAdditive)} keyMapping={keyboardKey}
                                        key={scaleDegree} active={keyboardKeyNum !== undefined} isEditing={editingNote === scaleDegree} scaleDegree={scaleDegree} onClick={setEditingNote}/>
            // </Tooltip>
        )
    }

    return <div className="w-full flex justify-center mt-2 items-center">
        <div className={"flex flex-row justify-center flex-wrap border-neutral-500 border-2 rounded-xl overflow-hidden"}>
            {freqBarArr}
        </div>
        <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
            <button className="btn w-7 aspect-square bg-white text-black rounded-3xl hover:bg-gray-100 mx-2">?</button>
        </Tooltip>
    </div>;
}

export default FrequencyBarComponent;
