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
import {MCActions} from "./Reducers";

const MIDDLE_C = 60;

interface MicrotonalPianoProps {
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function,
    keyMapping: Record<string, number>,
    midiReceiver: MidiReceiver,
    setKeyMapping: Function
}

export default function MicrotonalPiano(props: MicrotonalPianoProps) {
    const [octave, setOctave] = useState(0);
    const [keyOffset, setKeyOffset] = useState(3);

    useEffect(() => {
        console.log("octave", octave);
    }, [octave])

    let keyboardShortcuts = createPianoKeyboardShortcuts(props.microtonalConfig.scaleConfig.rootKey + keyOffset, props.microtonalConfig.scaleConfig.keysPerOctave);

    useEffect(() => {
            keyboardShortcuts = createPianoKeyboardShortcuts(props.microtonalConfig.scaleConfig.rootKey + keyOffset, props.microtonalConfig.scaleConfig.keysPerOctave);
        },
        [props.microtonalConfig]
    )

    const handleMasterGainChange = (value: number) => {
        props.mcDispatch({type: MCActions.SET_MASTER_GAIN, gain: value});
    }

    return <div className="flex flex-col justify-center h-full border-gold border-t-2 border-l-2 border-b-2 rounded-tl-xl rounded-bl-xl bg-bglight">
        <div className="flex justify-center">
            <FrequencyBarComponent  keyMapping={props.keyMapping} keyboardShortcuts={keyboardShortcuts} scaleConfig={props.microtonalConfig.scaleConfig}
                                    playMidiNote={() => {}} midiReceiver={props.midiReceiver} keyOffset={keyOffset}
                                    setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
        </div>
        <div className="flex flex-row justify-center mx-[5%] h-[70%] mt-[2%]">
            <div className="flex w-1/8 mr-[1%]">
                <Knobs knobLabel="GAIN" onChange={(value) => handleMasterGainChange(value)} />
            </div>
            <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
            <ReactPianoWrapper keyboardShortcuts={keyboardShortcuts} keyMapping={props.keyMapping}
                               scaleConfig={props.microtonalConfig.scaleConfig} keyOffset={keyOffset} midiReceiver={props.midiReceiver}
                               rootKey={props.microtonalConfig.scaleConfig.rootKey + octave * props.microtonalConfig.scaleConfig.keysPerOctave}/>
        </div>
    </div>;
}