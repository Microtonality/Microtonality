import * as React from 'react';
import './piano.css';
import {useEffect} from 'react';
import SynthSettings from "./SynthSettings";
import SettingsPanel from "./settings panel/SettingsPanel";
import MicrotonalPiano from "./MicrotonalPiano"
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import {MCActions, MicrotonalConfigHistory} from "./Reducers";
import Button from "../../ui/Button";
import ErrorPopup from "../../ui/ErrorPopup";
import {useMCDispatch, useMConfig, useMConfigHistory} from "./PlayProvider";
import {MicrotonalConfig} from "../../utility/MicrotonalConfig";
import SettingsPanelProvider from "./settings panel/SettingsPanelProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

const additiveSynth: AdditiveSynthesizer = new AdditiveSynthesizer();
const midiReceiver: MidiReceiver = new MidiReceiver(additiveSynth);

export default function Play(): ReactJSXElement {

    const mcHistory: MicrotonalConfigHistory = useMConfigHistory();
    const microtonalConfig: MicrotonalConfig = useMConfig();
    const mcDispatch: Function = useMCDispatch();

    useEffect(() => {
        midiReceiver.config = microtonalConfig.scaleConfig;
        midiReceiver.keyMapping = microtonalConfig.keyMapping;
        additiveSynth.config = microtonalConfig.synthConfig;
        additiveSynth.updateSettings();
    }, [microtonalConfig]);

    const handleUndo = (): void => {
        mcDispatch({type: MCActions.UNDO_CONFIG});
    }

    const handleRedo = (): void => {
        mcDispatch({type: MCActions.REDO_CONFIG});
    }

    return (
        <div className={'flex flex-1 w-full h-full mt-1 overflow-auto'}>

            <ErrorPopup />

            <div className={'max-w-xs 2xl:max-w-md'}>
                <SettingsPanelProvider>
                    <SettingsPanel />
                </SettingsPanelProvider>
            </div>

            <div className={'flex flex-col w-full ml-1'}>

                {/*<PianoPanel />*/}

                <div className={'absolute flex-row ml-3 mt-3'}>
                    <Button
                        className={'mr-1'}
                        text={'UNDO'}
                        disabled={mcHistory.previous.length === 0}
                        onClick={handleUndo}
                    />
                    <Button
                        text={'REDO'}
                        disabled={mcHistory.next.length === 0}
                        onClick={handleRedo}
                    />
                </div>

                <div className={'h-1/2 flex-row mb-1'}>
                    <MicrotonalPiano
                        keyMapping={mcHistory.current.keyMapping}
                        midiReceiver={midiReceiver}
                        setKeyMapping={() => {}}
                    />
                </div>

                <div className={'h-1/2 flex-row'}>
                    {/*<SynthSettingsPanel />*/}
                    <SynthSettings />
                </div>

            </div>
        </div>
    );
}