import * as React from 'react';
import { Grid, Popper, Tooltip } from '@mui/material';
import { Piano, KeyboardShortcuts } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';
import { NoteToMidi, NotesFromOctave } from '../../utility/midi/NoteToMidiConverter';
import SynthSettings from "./SynthSettings";
import BasicSettings from "./BasicSettings";
import PianoKeyButton from "../../ui/PianoKeyButton";
import FullPianoComponent from "./Piano"
import FrequencyBarComponent from "./FrequencyBar";
import {createMicrotonalConfig, DEFAULT_MICROTONAL_CONFIG} from "../../utility/MicrotonalConfig";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import MidiReceiver from "../../utility/midi/MIDIReceiver";

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
        <div className="xl:mt-11 md:mt-7 mt-3 flex-1 flex flex-col justify-between">
            <div className={"flex flex-col items-center h-1/3"}>
                <div className="flex items-center max-w-full w-2/3 h-full">
                    <div className={"h-full flex flex-col w-full"}>
                        <div className={"flex justify-center align-center"}>
                            <FullPianoComponent scaleConfig={microtonalConfig[currentSynth].scaleConfig} keyMapping={microtonalConfig[currentSynth].keyMapping}
                                                setKeyMapping={() => {}}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between h-1/2 flex-col md:flex-row">
                <BasicSettings scaleConfig={microtonalConfig[currentSynth].scaleConfig}/>
                <SynthSettings/>
            </div>
        </div>
    );
}