import * as React from 'react';
import './piano.css';
import {useState, useEffect, useReducer} from 'react';
import SynthSettings from "./SynthSettings";
import ScaleSettings from "./ScaleSettings";
import FullPianoComponent from "./MicrotonalPiano"
import {createMicrotonalConfig, MicrotonalConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import {MCActions, MicrotonalConfigHistory, MicrotonalConfigReducer} from "./Reducers";
import Button from "../../ui/Button";

export default function Play() {
    const [microtonalConfigHistory, mcDispatch] = useReducer(
        MicrotonalConfigReducer,
        {
            previous: [],
            current: createMicrotonalConfig(),
            next: []
        } as MicrotonalConfigHistory
    );

    const additiveSynth = new AdditiveSynthesizer();
    const midiReceiver = new MidiReceiver(additiveSynth, microtonalConfigHistory.current.scaleConfig, microtonalConfigHistory.current.keyMapping);

    useEffect(() => {
        midiReceiver.config = microtonalConfigHistory.current.scaleConfig;
        midiReceiver.keyMapping = microtonalConfigHistory.current.keyMapping;
        additiveSynth.config = microtonalConfigHistory.current.synthConfig;
        additiveSynth.updateSettings();
    }, [microtonalConfigHistory]);

    const handleUndo = () => {
        mcDispatch({type: MCActions.UNDO_CONFIG});
    }

    const handleRedo = () => {
        mcDispatch({type: MCActions.REDO_CONFIG});
    }

    return (
        <div className="mt-1 flex-1 flex h-screen w-screen">

            <div className="w-[35vw] h-full">
                <ScaleSettings microtonalConfig={microtonalConfigHistory.current} mcDispatch={mcDispatch}/>
            </div>


            <div className={"flex flex-col w-full ml-1"}>

                {/* TODO remove and put buttons where they're supposed to go*/}
                <div className="absolute flex flex-row ml-3 mt-3 font-agrandir text-md">
                    <div className={`mr-1 ${microtonalConfigHistory.previous.length === 0 ? 'text-neutral-400' : 'text-black'}`}>
                        <Button onClick={() => handleUndo()} disabled={microtonalConfigHistory.previous.length === 0} text={"UNDO"}/>
                    </div>
                    <div className={`${microtonalConfigHistory.next.length === 0 ? 'text-neutral-400' : 'text-black'}`}>
                        <Button onClick={() => handleRedo()} disabled={microtonalConfigHistory.next.length === 0} text={"REDO"}/>
                    </div>
                </div>

                <div className="h-1/2 mb-1 md:flex-row">
                    <FullPianoComponent microtonalConfig={microtonalConfigHistory.current}
                                        mcDispatch={mcDispatch}
                                        keyMapping={microtonalConfigHistory.current.keyMapping}
                                        midiReceiver={midiReceiver}
                                        setKeyMapping={() => {}}/>
                </div>

                <div className="h-1/2 md:flex-row">
                    <SynthSettings microtonalConfig={microtonalConfigHistory.current} mcDispatch={mcDispatch} />
                </div>

            </div>

        </div>
    );
}