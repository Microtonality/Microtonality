import * as React from 'react';
import './piano.css';
import {useState, useEffect, useReducer} from 'react';
import SynthSettings from "./SynthSettings";
import ScaleSettings from "./ScaleSettings";
import FullPianoComponent from "./MicrotonalPiano"
import {MicrotonalConfig, createMicrotonalConfig} from "../../utility/MicrotonalConfig";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import {MCActions, MicrotonalConfigReducer} from "./Reducers";
import {Button} from "@mui/material";

export default function Play() {

    const [microtonalConfig, mcDispatch] = useReducer(MicrotonalConfigReducer, createMicrotonalConfig());
    const [currentConfig, setCurrentConfig] = useState(0);
    const [microtonalConfigHistory, setMicrotonalConfigHistory] = useState([microtonalConfig]);

    const additiveSynth = new AdditiveSynthesizer();
    const midiReceiver = new MidiReceiver(additiveSynth, microtonalConfig.scaleConfig, microtonalConfig.keyMapping);

    useEffect(() => {
        // Check if the config we switched to is in the history.
        let mConfig: MicrotonalConfig;
        let thisConfigJSON = JSON.stringify(microtonalConfig);
        for (mConfig of microtonalConfigHistory) {
            if (thisConfigJSON === JSON.stringify(mConfig))
                return;
        }

        // If not, create a new history.
        let newHistory: MicrotonalConfig[];

        // If we not at the end of the history, remove everything in front.
        if (currentConfig !== microtonalConfigHistory.length - 1)
            newHistory = microtonalConfigHistory.slice(0, currentConfig + 1);
        else
            newHistory = microtonalConfigHistory;

        newHistory.push(microtonalConfig);

        setMicrotonalConfigHistory(() => newHistory);
        setCurrentConfig(() => newHistory.length - 1);
        updateConfig(newHistory[newHistory.length - 1]);
    }, [microtonalConfig]);

    useEffect(() => {
        console.log('current', currentConfig, microtonalConfigHistory[currentConfig]);
        midiReceiver.config = microtonalConfigHistory[currentConfig].scaleConfig;
        midiReceiver.keyMapping = microtonalConfigHistory[currentConfig].keyMapping;
        additiveSynth.config = microtonalConfigHistory[currentConfig].synthConfig;
        additiveSynth.updateSettings();
    }, [currentConfig]);

    const handleUndo = () => {
        updateConfig(microtonalConfigHistory[currentConfig - 1]);
        setCurrentConfig((prevValue) => prevValue - 1);
    };

    const handleRedo = () => {
        updateConfig(microtonalConfigHistory[currentConfig + 1]);
        setCurrentConfig((prevValue) => prevValue + 1);
    }

    const updateConfig = (config: MicrotonalConfig) => {
        mcDispatch({type: MCActions.SET_MICROTONAL_CONFIG, microtonalConfig: config});
    }

    return (
        <div className="mt-[1%] flex-1 flex h-screen w-screen">

            <div className="w-[35vw] h-full">
                <ScaleSettings microtonalConfig={microtonalConfigHistory[currentConfig]} mcDispatch={mcDispatch}/>
            </div>



            <div className={"flex flex-col w-full ml-[1%]"}>

                {/* TODO remove and put buttons where they're supposed to go*/}
                <div className="md:flex-row">
                    <Button onClick={() => handleUndo()} disabled={currentConfig === 0}>UNDO</Button>
                    <Button onClick={() => handleRedo()} disabled={currentConfig === microtonalConfigHistory.length - 1}>REDO</Button>
                </div>

                <div className="h-1/2 mb-[1.5%] md:flex-row">
                    <FullPianoComponent microtonalConfig={microtonalConfigHistory[currentConfig]}
                                        mcDispatch={mcDispatch}
                                        keyMapping={microtonalConfigHistory[currentConfig].keyMapping}
                                        midiReceiver={midiReceiver}
                                        setKeyMapping={() => {}}/>
                </div>

                <div className="h-1/2 md:flex-row">
                    <SynthSettings microtonalConfig={microtonalConfigHistory[currentConfig]} mcDispatch={mcDispatch} />
                </div>

            </div>

        </div>
    );
}