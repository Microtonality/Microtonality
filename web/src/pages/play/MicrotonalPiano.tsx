import {useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import { Piano, KeyboardShortcuts } from 'react-piano';
import {NoteToMIDI} from "../../utility/midi/NoteToMIDI";
import { Grid, Tooltip } from "@mui/material";
import Knobs from "../../ui/Knobs"

function createDefaultKeyMapping(keys: number) {
    return {}
}

function playNote() {

}

function stopNote() {

}

export default function MicrotonalPiano(props: {
    scaleConfig: ScaleConfig,
    keyMapping: Record<string, number>,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);
    return <div className="h-full border-gold border-t-2 border-l-2 border-b-2 rounded-tl-xl rounded-bl-xl bg-bglight">

        <div className="flex justify-center mt-[2%]">
            
            <FrequencyBarComponent keyMapping={{0: 0, 1: 1, 2: 2}} notesPerOctave={12} playMidiNote={() => {}}
                                setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
            <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
                <button className="btn w-8 h-8 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
            </Tooltip>
        </div>

        <div className="flex w-[85%] h-[70%] mt-[2%] ml-[4%]">
            <div className="flex flex-row aspect-square w-1/5">
                <Knobs knobLabel="GAIN" onChange={(value) => console.log(value)} />
            </div>
            <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
            <Piano
                playNote={playNote}
                stopNote={stopNote}
                noteRange={{ first: NoteToMIDI('c' + octave), last: NoteToMIDI('b' + octave) }}
            />
        </div>
    </div>;
}