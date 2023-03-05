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
    const [microtonalConfig, setMicrotonalConfig] = useState([createMicrotonalConfig()]);
    // Which of the microtonalConfigs is active on screen right now?
    const [currentSynth, setCurrentSynth] = useState(0);
    const additiveSynth = new AdditiveSynthesizer();
    const midiReceiver = new MidiReceiver(additiveSynth, microtonalConfig[currentSynth].scaleConfig);

    useEffect(() => {
        midiReceiver.config = microtonalConfig[0].scaleConfig;
        additiveSynth.config = microtonalConfig[0].synthConfig;
    })

    return (
        <div className="mt-[1%] flex-1 flex h-screen w-screen">

            <div className="w-[30%] h-full">
                <ScaleSettings scaleConfig={microtonalConfig[currentSynth].scaleConfig}/>
            </div>

            <div className={"flex flex-col w-full ml-[1%]"}>
                <div className="h-1/2 mb-[1.5%] md:flex-row">
                    <FullPianoComponent scaleConfig={microtonalConfig[currentSynth].scaleConfig}
                                        keyMapping={microtonalConfig[currentSynth].keyMapping}
                                        midiReceiver={midiReceiver}
                                        setKeyMapping={() => {}}/>
                </div>

                <div className="h-1/2 md:flex-row">
                    <SynthSettings microtonalConfig={microtonalConfig[currentSynth]} setMicrotonalConfig={setMicrotonalConfig}/>
                </div>
            </div>

        </div>
    );
}