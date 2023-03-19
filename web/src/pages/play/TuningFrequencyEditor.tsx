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

    const [tuningFrequency, setTuningFrequency] = useState(props.microtonalConfig.scaleConfig.tuningFrequency.toString());
    const tuningFrequencyInputField = useRef(null);

    useEffect(() => {
        setTuningFrequency(props.microtonalConfig.scaleConfig.tuningFrequency.toString());
    }, [props.microtonalConfig])

    const wrapSetTuningFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTuningFrequency(event.target.value);
    }

    const handleTuningFrequencySubmit = () => {
        props.mcDispatch({type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: parseFloat(tuningFrequency)});
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            tuningFrequencyInputField.current.blur();
            handleTuningFrequencySubmit();
            return;
        }
    }

    return (
        <div>
            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                BASE
                FREQUENCY
            </div>
            <div className="flex w-[85%] h-10 mt-[2%] mx-[7%]">
                <input type="number" ref={tuningFrequencyInputField} value={(tuningFrequency === '') ? 0 : parseFloat(tuningFrequency)} onChange={(e) => wrapSetTuningFrequency(e)} onKeyDown={(e) => handleKeyDown(e)} onBlur={() => handleTuningFrequencySubmit()} step="0.0001" className="w-full rounded-md font-agrandir pl-[2%]" />
            </div>
        </div>
    );
}