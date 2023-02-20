import {useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";

function createDefaultKeyMapping(keys: number) {
    return {}
}


export default function Piano(props: {
    synthIndex: number,
    notesPerOctave: number
    keyMapping: Record<number, number>,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);





    return <div>
        <FrequencyBarComponent keyMapping={{0: 0, 1: 1, 2: 2}} notesPerOctave={12} playMidiNote={() => {}} updateKeyMapping={() => {}} octaveOffset={octave}/>
        <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
    </div>;
}