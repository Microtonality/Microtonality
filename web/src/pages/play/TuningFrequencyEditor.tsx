import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {MCActions} from "./Reducers";

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