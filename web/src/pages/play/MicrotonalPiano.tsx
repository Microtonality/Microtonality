import {useEffect, useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import {Piano as ReactPiano, KeyboardShortcuts} from 'react-piano';
import ReactPianoWrapper from "./ReactPianoWrapper";
import {createPianoKeyboardShortcuts} from "../../utility/microtonal/PianoKeyMapping";
import Knobs from '../../ui/Knobs'
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import { setGain } from "./Reducers";

const MIDDLE_C = 60;

export default function MicrotonalPiano(props: {
    microtonalConfig: MicrotonalConfig,
    setMicrotonalConfig: Function,
    keyMapping: Record<string, number>,
    midiReceiver: MidiReceiver,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);

    useEffect(() => {
        console.log("octave", octave);
    }, [octave])

    let keyboardShortcuts = createPianoKeyboardShortcuts(props.microtonalConfig.scaleConfig.rootKey, props.microtonalConfig.scaleConfig.keysPerOctave);

    return <div className="h-full border-gold border-t-2 border-l-2 border-b-2 rounded-tl-xl rounded-bl-xl bg-bglight">
        <FrequencyBarComponent keyMapping={props.keyMapping} keyboardShortcuts={keyboardShortcuts} scaleConfig={props.microtonalConfig.scaleConfig}
                                playMidiNote={() => {}} midiReceiver={props.midiReceiver}
                                setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
        <div className="flex w-[85%] h-[70%] mt-[2%] ml-[4%]">
            <div className="flex flex-row aspect-square w-1/5">
                <Knobs knobLabel="GAIN" onChange={(value) => props.setMicrotonalConfig(setGain(props.microtonalConfig, value)) } />
            </div>
            <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
            <ReactPianoWrapper keyboardShortcuts={keyboardShortcuts} keyMapping={props.keyMapping}
                scaleConfig={props.microtonalConfig.scaleConfig}
                                midiReceiver={props.midiReceiver}
                                rootKey={props.microtonalConfig.scaleConfig.rootKey + octave * props.microtonalConfig.scaleConfig.keysPerOctave}/>
        </div>
    </div>;
}