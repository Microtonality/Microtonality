import * as React from 'react';
import { Grid, Popper, Tooltip } from '@mui/material';
import { Piano, KeyboardShortcuts } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';
import { Synthesizer } from '../../synthesizer/Synthesizer';
import { NoteToMidi, NotesFromOctave } from '../../utility/midi/NoteToMidiConverter';
import FrequencyBar from '../../synthesizer/FrequencyBar';
import SynthSettings from "./SynthSettings";
import BasicSettings from "./BasicSettings";
import PianoKeyButton from "../../ui/PianoKeyButton";
import FullPianoComponent from "./Piano"
import FrequencyBarComponent from "./FrequencyBar";
import {DEFAULT_MICROTONAL_CONFIG} from "../../utility/MicrotonalConfig";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";

// TODO: When a user is holding down a note and changes the octave,
// the note remains downpressed on the original octave.
// You then need to press the note twice to play it.
const frequencyBar = new FrequencyBar();
const synthesizer = new Synthesizer(frequencyBar);

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
    const [microtonalConfig, setMicrotonalConfig] = useState(DEFAULT_MICROTONAL_CONFIG);
    const additiveSynth = new AdditiveSynthesizer();

    useEffect(() => {
        additiveSynth.config = microtonalConfig.synthConfig;
    })

    return (
        <div className="xl:mt-11 md:mt-7 mt-3 flex-1 flex flex-col justify-between">
            <div className={"flex flex-col items-center h-1/3"}>
                <div className="flex items-center max-w-full w-2/3 h-full">
                    <div className={"h-full flex flex-col w-full"}>
                        <div className={"flex justify-center align-center"}>
                            <FullPianoComponent synthIndex={0}/>
                            <Popper id={id} open={open} anchorEl={anchorEl} className="w-35 h-10 bg-white rounded-md font-agrandir-wide text-black text-center">
                                <p className="mt-2 mx-2">Assign key...</p>
                            </Popper>
                            <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
                                <button className="btn 2xl:h-8 2xl:w-8 xl:h-8 xl:w-8 lg:h-7 lg-w-7 md:h-7 md:w-7 sm:h-6 sm:w-6 xs:h-6 xs:w-6 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
                            </Tooltip>
                        </div>
                        <Piano
                            activeNotes={synthesizer.activeNotes}
                            className="mx-auto my-auto"
                            playNote={synthesizer.NoteOn}
                            stopNote={synthesizer.NoteOff}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between h-1/2 flex-col md:flex-row">
                <BasicSettings freqBarValue={microtonalConfig.scaleConfig.tuningFrequency}
                    baseFreq={microtonalConfig.scaleConfig.rootKey}/>
                <SynthSettings/>
            </div>
        </div>
    );
}