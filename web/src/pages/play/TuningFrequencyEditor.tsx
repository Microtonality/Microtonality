// Some code adapted for our use case from https://github.com/facebook/react/issues/18404#issuecomment-605294038

import * as React from "react";
import {MicrotonalConfig} from "../../utility/MicrotonalConfig";
import {useState} from "react";
import {MCActions} from "./Reducers";

interface TuningFrequencyEditorProps {
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function TuningFrequencyEditor(props: TuningFrequencyEditorProps) {

    const [tuningFrequency, setTuningFrequency] = useState(props.microtonalConfig.scaleConfig.tuningFrequency);
    const tuningFrequencyInputField = React.useRef<HTMLInputElement>(null);

    const wrapSetTuningFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTuningFrequency(() => parseFloat(event.target.value));
    }

    const handleTuningFrequencyChange = () => {
        props.mcDispatch({state: props.microtonalConfig, action: {type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: tuningFrequency}});
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            tuningFrequencyInputField.current.blur();
            handleTuningFrequencyChange();
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
                <input type="number" ref={tuningFrequencyInputField} value={tuningFrequency} onChange={(e) => wrapSetTuningFrequency(e)} onKeyDown={(e) => handleKeyDown(e)} onBlur={() => handleTuningFrequencyChange()} step="0.0001" className="w-full rounded-md font-agrandir pl-[2%]" />
            </div>
        </div>
    );
}