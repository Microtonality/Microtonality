import * as React from 'react';
import './piano.css';
import {useState, useEffect, useReducer} from 'react';
import SynthSettings from "./SynthSettings";
import SettingsPanel from "./settings panel/SettingsPanel";
import MicrotonalPiano from "./MicrotonalPiano"
import {createMicrotonalConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import {MCActions, MicrotonalConfigHistory, MicrotonalConfigReducer} from "./Reducers";
import Button from "../../ui/Button";
import ErrorPopup, {HIDE_ERROR} from "../../ui/ErrorPopup";


const additiveSynth = new AdditiveSynthesizer()
const midiReceiver = new MidiReceiver(additiveSynth)

export default function Play() {
    const [errorMsg, displayErrorMsg] = useState<string>(HIDE_ERROR);
    const [microtonalConfigHistory, mcDispatch] = useReducer(
        MicrotonalConfigReducer,
        {
            previous: [],
            current: createMicrotonalConfig(),
            next: []
        } as MicrotonalConfigHistory
    );

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
        <div className={'flex flex-1 w-full h-full mt-1 overflow-auto'}>

            <ErrorPopup errorMsg={errorMsg} displayErrorMsg={displayErrorMsg}/>

            <div className={'flex flex-col max-w-xs 2xl:max-w-md'}>
                <SettingsPanel
                    microtonalConfig={microtonalConfigHistory.current}
                    mcDispatch={mcDispatch}
                    displayErrorMsg={displayErrorMsg}
                />
            </div>

            <div className={"flex flex-col w-full ml-1"}>

                <div className="absolute flex flex-row ml-3 mt-3">
                    <Button className="mr-1" onClick={() => handleUndo()} disabled={microtonalConfigHistory.previous.length === 0} text={"UNDO"}/>
                    <Button className="" onClick={() => handleRedo()} disabled={microtonalConfigHistory.next.length === 0} text={"REDO"}/>
                </div>

                <div className="h-1/2 mb-1 md:flex-row">
                    <MicrotonalPiano microtonalConfig={microtonalConfigHistory.current}
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