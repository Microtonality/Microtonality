import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {MCActions} from "../Reducers";
import SettingsFieldTitle from "./SettingsFieldTitle";

interface TuningFrequencyEditorProps {
    tuningFrequency: number,
    mcDispatch: Function
}

export default function TuningFrequencyEditor(props: TuningFrequencyEditorProps) {

    let [tuningFreqInput, setTuningFreqInput] = useState<string>(props.tuningFrequency.toString())
    const tuningFrequencyInputField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTuningFreqInput(props.tuningFrequency.toString());
    }, [props.tuningFrequency]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            tuningFrequencyInputField.current.blur();
        }
    }

    const submitTuningFreqInput = () => {
        let frequency: number = clampTuningFrequency(parseFloat(tuningFreqInput));
        if (frequency === props.tuningFrequency) {
            setTuningFreqInput(frequency.toString());
            return;
        }

        props.mcDispatch({type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: frequency});
    }

    const clampTuningFrequency = (freq: number): number => {
        if (isNaN(freq))
            return props.tuningFrequency;

        return Math.max(0, freq);
    }

    return (
        <div className={'flex flex-col mb-4'}>
            <SettingsFieldTitle text={'BASE FREQUENCY'} />
            <input
                className={'settings-panel-input text-lg'}
                type={'number'}
                value={tuningFreqInput}
                ref={tuningFrequencyInputField}
                onBlur={() => submitTuningFreqInput()}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setTuningFreqInput(e.target.value)}
            />
        </div>
    );
}