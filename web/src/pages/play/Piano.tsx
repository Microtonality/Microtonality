import {useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {ScaleConfig} from "../../utility/MicrotonalConfig";

function createDefaultKeyMapping(keys: number) {
    return {}
}


export default function Piano(props: {
    scaleConfig: ScaleConfig,
    keyMapping: Record<string, number>,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);
    return <div>
        <FrequencyBarComponent keyMapping={{0: 0, 1: 1, 2: 2}} notesPerOctave={12} playMidiNote={() => {}}
                               setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
        <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
        {/*<Piano*/}
        {/*    activeNotes={synthesizer.activeNotes}*/}
        {/*    className="mx-auto my-auto"*/}
        {/*    playNote={synthesizer.NoteOn}*/}
        {/*    stopNote={synthesizer.NoteOff}*/}
        {/*/>*/}
    </div>;
}