// Some code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import {MicrotonalConfig} from "../../utility/MicrotonalConfig";
import {useEffect, useRef, useState} from "react";
import {MCActions} from "./Reducers";

interface TuningFrequencyEditorProps {
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function TuningFrequencyEditor(props: TuningFrequencyEditorProps) {

    let [tuningFrequency, setTuningFrequency] = useState<number>(props.microtonalConfig.scaleConfig.tuningFrequency);
    let [tuningFreqInput, setTuningFreqInput] = useState<string>(props.microtonalConfig.scaleConfig.tuningFrequency.toString())
    const tuningFrequencyInputField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTuningFrequency(props.microtonalConfig.scaleConfig.tuningFrequency);
    }, [props.microtonalConfig]);

    useEffect(() => {
        setTuningFreqInput(tuningFrequency.toString());
    }, [tuningFrequency]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            tuningFrequencyInputField.current.blur();
            submitTuningFreqInput();
        }
    }

    const submitTuningFreqInput = () => {
        let frequency: number = clampTuningFrequency(parseFloat(tuningFreqInput));
        if (isNaN(frequency) || frequency === tuningFrequency) {
            setTuningFreqInput(frequency.toString());
            return;
        }

        props.mcDispatch({type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: frequency});
    }

    const clampTuningFrequency = (freq: number): number => {
        if (isNaN(freq))
            return tuningFrequency;

        return Math.max(0, freq);
    }

    return (
        <div>
            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                BASE
                FREQUENCY
            </div>
            <div className="flex w-[85%] h-10 mt-[2%] mx-[7%]">
                <input type="number" ref={tuningFrequencyInputField} value={tuningFreqInput} onChange={(e) => setTuningFreqInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} onBlur={() => submitTuningFreqInput()} step="0.0001" className="w-full rounded-md font-agrandir pl-[2%]" />
            </div>
        </div>
    );
}