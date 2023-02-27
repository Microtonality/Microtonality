import {useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import {Piano as ReactPiano, KeyboardShortcuts} from 'react-piano';
import ReactPianoWrapper from "./ReactPianoWrapper";
import {createPianoKeyboardShortcuts} from "../../utility/microtonal/PianoKeyMapping";

const MIDDLE_C = 60;

export default function Piano(props: {
    scaleConfig: ScaleConfig,
    keyMapping: Record<string, number>,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);


    let keyboardShortcuts = createPianoKeyboardShortcuts(MIDDLE_C, props.scaleConfig.keysPerOctave);

    return <div>
        <FrequencyBarComponent keyMapping={props.keyMapping} keyboardShortcuts={keyboardShortcuts} scaleConfig={props.scaleConfig}
                               playMidiNote={() => {}}
                               setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
        <div className={"flex flex-row w-60 h-40"}>
            <OctaveButtons octaveUp={() => setOctave(octave + 1)}
                           octaveDown={() => setOctave(octave - 1)}/>
            <ReactPianoWrapper keyboardShortcuts={keyboardShortcuts} keyMapping={props.keyMapping}
                               scaleConfig={props.scaleConfig}
                               rootKey={MIDDLE_C + octave * props.scaleConfig.keysPerOctave}/>
        </div>
    </div>;
}
