import * as React from "react";
import {useState} from "react";
import {MCActions} from "../../Reducers";
import SettingsFieldTitle from "./SettingsFieldTitle";
import {useMCDispatch, useMConfig} from "../../PlayProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function TuningFrequencyEditor(): ReactJSXElement {

    const currentTuningFreq = useMConfig().scaleConfig.tuningFrequency;
    const mcDispatch: Function = useMCDispatch();
    const [tuningFreqInput, setTuningFreqInput] = useState<number>(currentTuningFreq)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    }

    const submitTuningFreqInput = (): void => {
        let frequency: number = clampTuningFrequency(tuningFreqInput);
        if (frequency === currentTuningFreq) {
            setTuningFreqInput(frequency);
            return;
        }

        mcDispatch({type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: frequency});
    }

    const clampTuningFrequency = (freq: number): number => {
        if (isNaN(freq))
            return currentTuningFreq;

        return Math.max(0, freq);
    }

    return (
        <div className={'flex flex-col mb-4'}>
            <SettingsFieldTitle text={'BASE FREQUENCY'} />
            <input
                className={'settings-panel-input text-lg'}
                type={'number'}
                value={tuningFreqInput}
                onBlur={() => submitTuningFreqInput()}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setTuningFreqInput(parseFloat(e.target.value))}
            />
        </div>
    );
}