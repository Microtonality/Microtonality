import * as React from 'react';
import './piano.css';
import {useState, useEffect, useReducer} from 'react';
import SynthSettings from "./SynthSettings";
import ScaleSettings from "./ScaleSettings";
import FullPianoComponent from "./MicrotonalPiano"
import {MicrotonalConfig, createMicrotonalConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import {MicrotonalConfigReducer} from "./Reducers";

export default function Play() {
    // const [microtonalConfig, setMicrotonalConfig] = useState<MicrotonalConfig>(createMicrotonalConfig());
    const [microtonalConfig, mcDispatch] = useReducer(MicrotonalConfigReducer, createMicrotonalConfig());
    const additiveSynth = new AdditiveSynthesizer();
    const midiReceiver = new MidiReceiver(additiveSynth, microtonalConfig.scaleConfig, microtonalConfig.keyMapping);

    useEffect(() => {
        midiReceiver.config = microtonalConfig.scaleConfig;
        midiReceiver.keyMapping = microtonalConfig.keyMapping;
        additiveSynth.config = microtonalConfig.synthConfig;
        additiveSynth.updateSettings();
    }, [microtonalConfig]);

    return (
        <div className="mt-[1%] flex-1 flex h-screen w-screen">

            <div className="w-[30%] h-full">
                <ScaleSettings microtonalConfig={microtonalConfig} mcDispatch={mcDispatch}/>
            </div>

            <div className={"flex flex-col w-full ml-[1%]"}>
                <div className="h-1/2 mb-[1.5%] md:flex-row">
                    <FullPianoComponent microtonalConfig={microtonalConfig}
                                        setMicrotonalConfig={mcDispatch}
                                        keyMapping={microtonalConfig.keyMapping}
                                        midiReceiver={midiReceiver}
                                        setKeyMapping={() => {}}/>
                </div>

                <div className="h-1/2 md:flex-row">
                    <SynthSettings microtonalConfig={microtonalConfig} mcDispatch={mcDispatch} />
                </div>
            </div>

        </div>
    );
}