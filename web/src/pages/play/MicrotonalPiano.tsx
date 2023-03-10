import {useEffect, useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import {Piano as ReactPiano, KeyboardShortcuts} from 'react-piano';
import ReactPianoWrapper from "./ReactPianoWrapper";
import {createPianoKeyboardShortcuts} from "../../utility/microtonal/PianoKeyMapping";
import Knobs from '../../ui/Knobs'
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import MidiReceiver from "../../utility/midi/MIDIReceiver";

const MIDDLE_C = 60;

export default function MicrotonalPiano(props: {
    scaleConfig: ScaleConfig,
    keyMapping: Record<string, number>,
    midiReceiver: MidiReceiver,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);

    useEffect(() => {
        console.log("octave", octave);
    }, [octave])

    let keyboardShortcuts = createPianoKeyboardShortcuts(props.scaleConfig.rootKey, props.scaleConfig.keysPerOctave);

    return <div className="h-full border-gold border-t-2 border-l-2 border-b-2 rounded-tl-xl rounded-bl-xl bg-bglight">
        <FrequencyBarComponent keyMapping={props.keyMapping} keyboardShortcuts={keyboardShortcuts} scaleConfig={props.scaleConfig}
                               playMidiNote={() => {}} midiReceiver={props.midiReceiver}
                               setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
        <div className="flex w-[85%] h-[70%] mt-[2%] ml-[4%]">
            <div className="flex flex-row aspect-square w-1/5">
                <Knobs knobLabel="GAIN" onChange={(value) => console.log(value)} />
            </div>
            <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
            <ReactPianoWrapper keyboardShortcuts={keyboardShortcuts} keyMapping={props.keyMapping}
                                scaleConfig={props.scaleConfig}
                                midiReceiver={props.midiReceiver}
                                rootKey={props.scaleConfig.rootKey + octave * props.scaleConfig.keysPerOctave}/>
        </div>
    </div>;
}