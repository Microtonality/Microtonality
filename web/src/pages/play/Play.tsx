import * as React from 'react';
import './piano.css';
import { useState, useEffect } from 'react';
import SynthSettings from "./SynthSettings";
import ScaleSettings from "./ScaleSettings";
import FullPianoComponent from "./MicrotonalPiano"
import {createMicrotonalConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";

export default function Play() {
    const [microtonalConfig, setMicrotonalConfig] = useState(createMicrotonalConfig());
    // Which of the microtonalConfigs is active on screen right now?
    const additiveSynth = new AdditiveSynthesizer();
    const midiReceiver = new MidiReceiver(additiveSynth, microtonalConfig.scaleConfig);

    useEffect(() => {
        midiReceiver.config = microtonalConfig.scaleConfig;
        additiveSynth.config = microtonalConfig.synthConfig;
    }, [microtonalConfig]);

    return (
        <div className="mt-[1%] flex-1 flex h-screen w-screen">

            <div className="w-[30%] h-full">
                <ScaleSettings scaleConfig={microtonalConfig.scaleConfig}/>
            </div>

            <div className={"flex flex-col w-full ml-[1%]"}>
                <div className="h-1/2 mb-[1.5%] md:flex-row">
                    <FullPianoComponent scaleConfig={microtonalConfig.scaleConfig}
                                        keyMapping={microtonalConfig.keyMapping}
                                        midiReceiver={midiReceiver}
                                        setKeyMapping={() => {}}/>
                </div>

                <div className="h-1/2 md:flex-row">
                    <SynthSettings microtonalConfig={microtonalConfig} setMicrotonalConfig={setMicrotonalConfig} />
                </div>
            </div>

        </div>
    );
}