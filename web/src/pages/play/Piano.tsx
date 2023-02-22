import {useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import {Piano as ReactPiano} from 'react-piano';

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
        <div className={"flex flex-row w-60 h-40"}>
            <OctaveButtons octaveUp={() => setOctave(value => value + 1)}
                           octaveDown={() => setOctave(value => value - 1)}/>
            <ReactPiano
                // activeNotes={synthesizer.activeNotes}
                className="mx-auto my-auto"
                // C
                noteRange={{ first: 72, last: 72 + props.scaleConfig.keysPerOctave }}
                playNote={() => {}}
                stopNote={() => {}}
                // keyboardShortcuts={keyboardShortcuts}
            />
        </div>

    </div>;
}