import * as React from "react";
import {useEffect, useReducer, useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import OctaveButtons from "./OctaveButtons";
import {MicrotonalConfig} from "../../utility/MicrotonalConfig";
import ReactPianoWrapper from "./ReactPianoWrapper";
import {KeyShortcut, createPianoKeyboardShortcuts} from "../../utility/microtonal/PianoKeyMapping";
import Knobs from '../../ui/Knobs'
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {MCActions} from "./Reducers";
import {initializeOctaveOffset, OctaveAction, OctaveOffset, OctaveOffsetReducer} from "./PianoKeyReducer";
import {useMCDispatch, useMConfig} from "./PlayProvider";

const MIDDLE_C = 60;

interface MicrotonalPianoProps {
    keyMapping: Record<string, number>,
    midiReceiver: MidiReceiver,
    setKeyMapping: Function
}

export default function MicrotonalPiano(props: MicrotonalPianoProps) {

    const microtonalConfig: MicrotonalConfig = useMConfig();
    const mcDispatch: Function = useMCDispatch();

    const [octaveOffset, offsetDispatch] = useReducer(OctaveOffsetReducer, initializeOctaveOffset(microtonalConfig))

    useEffect(() => {
        offsetDispatch({type: OctaveAction.SET_MICROTONAL_CONFIG, config: microtonalConfig})
    }, [microtonalConfig])

    const generateKeyboardShortcuts = () => {
        let shortcuts: KeyShortcut[] = createPianoKeyboardShortcuts(
            microtonalConfig.scaleConfig.rootKey + octaveOffset.keyOffset + octaveOffset.octave * microtonalConfig.scaleConfig.keysPerOctave,
            octaveOffset.keyboardLength
        );

        let caps: KeyShortcut[] = shortcuts.map<KeyShortcut>((shortcut): KeyShortcut => {
            return {key: shortcut.key.toUpperCase(), midiNumber: shortcut.midiNumber} as KeyShortcut;
        });

        return shortcuts.concat(caps);
    }

    let [keyboardShortcuts, setKeyboardShortcuts] = useState(generateKeyboardShortcuts());

    useEffect(() => {
        setKeyboardShortcuts(generateKeyboardShortcuts());
    }, [microtonalConfig, octaveOffset])

    const handleMasterGainChange = (value: number) => {
        mcDispatch({type: MCActions.SET_MASTER_GAIN, gain: value});
    }

    return (
        <div className="flex flex-col justify-center h-full border-gold border-t-2 border-l-2 border-b-2 rounded-tl-xl rounded-bl-xl bg-bglight">
            <div className="flex justify-center">
                <FrequencyBarComponent
                    keyMapping={props.keyMapping}
                    keyboardShortcuts={keyboardShortcuts}
                    playMidiNote={() => {}}
                    midiReceiver={props.midiReceiver}
                    keyOffset={octaveOffset.keyOffset}
                    setKeyMapping={props.setKeyMapping}
                    octaveOffset={octaveOffset.octave}
                    mcDispatch={mcDispatch}
                />
            </div>
            <div className="flex flex-row justify-around w-full mt-1 flex-1 py-2">
                <div className="w-32">
                    <Knobs
                        knobLabel="GAIN"
                        value={microtonalConfig.synthConfig.gain}
                        onChange={(value: number) => handleMasterGainChange(value)}
                        className="border-gold border-[3px]"
                    />
                </div>
                <ReactPianoWrapper
                    keyboardShortcuts={keyboardShortcuts}
                    keyMapping={props.keyMapping}
                    keyOffset={octaveOffset.keyOffset}
                    midiReceiver={props.midiReceiver}
                    rootKey={microtonalConfig.scaleConfig.rootKey + octaveOffset.octave * microtonalConfig.scaleConfig.keysPerOctave}
                    keyboardLength={octaveOffset.keyboardLength}
                />
                <OctaveButtons
                    className={'pr-6'}
                    octaveUp={() => offsetDispatch({type: OctaveAction.INCREASE_OCTAVE})}
                    octaveDown={() => offsetDispatch({type: OctaveAction.DECREASE_OCTAVE})}
                />
            </div>
        </div>
    );
}