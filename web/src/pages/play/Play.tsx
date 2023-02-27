import * as React from 'react';
import { Grid, Popper, Tooltip } from '@mui/material';
import { Piano, KeyboardShortcuts } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';
import SynthSettings from "./SynthSettings";
import BasicSettings from "./BasicSettings";
import PianoKeyButton from "../../ui/PianoKeyButton";
import FullPianoComponent from "./MicrotonalPiano"
import FrequencyBarComponent from "./FrequencyBar";
import {createMicrotonalConfig, DEFAULT_MICROTONAL_CONFIG} from "../../utility/MicrotonalConfig";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import MidiReceiver from "../../utility/midi/MIDIReceiver";

declare global {
    namespace React {
      interface DOMAttributes<T> {
        onResize?: ReactEventHandler<T> | undefined;
        onResizeCapture?: ReactEventHandler<T> | undefined;
        nonce?: string | undefined;
      }
    }
  }

export default function Play() {
    const [microtonalConfig, setMicrotonalConfig] = useState([createMicrotonalConfig()]);
    // Which of the microtonalConfigs is active on screen right now?
    const [currentSynth, setCurrentSynth] = useState(0);
    const additiveSynth = new AdditiveSynthesizer();
    const midiReceiver = new MidiReceiver();

    useEffect(() => {
        additiveSynth.config = microtonalConfig[0].synthConfig;
        midiReceiver.config = microtonalConfig[0].scaleConfig;
    })

    return (
        <div className="mt-[1%] flex-1 flex h-screen w-screen">

            <div className="w-[30%] h-full">
                <BasicSettings scaleConfig={microtonalConfig[currentSynth].scaleConfig}/>
            </div>

            <div className={"flex flex-col w-full ml-[1%]"}>
                <div className="h-1/2 mb-[1.5%] md:flex-row">
                    <FullPianoComponent scaleConfig={microtonalConfig[currentSynth].scaleConfig} keyMapping={microtonalConfig[currentSynth].keyMapping}
                                                    setKeyMapping={() => {}}/>
                </div>

                <div className="h-1/2 md:flex-row">
                    <SynthSettings/>
                </div>
            </div>
             
        </div>
    );
}