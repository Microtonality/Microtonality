import * as React from "react";
import { useState } from "react";
import {Button, } from "@mui/material";
import {MicrotonalConfig, ScaleConfig} from "../../utility/MicrotonalConfig";
import TuningFrequencyEditor from "./TuningFrequencyEditor";

interface BasicSettingsProps {
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
}

export default function BasicSettings(props: BasicSettingsProps) {

    const [rangeValue, setRangeValue] = useState<number>(12);
    const [hideRangeValue, setHideRangeValue] = useState<boolean>(false)

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue(Number(event.target.value));
    };

    function beginAdjustment() {
        setHideRangeValue(true)
    }

    function endAdjustment() {
        setHideRangeValue(false)
    }

    return(
        <div>
            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%]">
                    EQUAL-TEMPERED SCALE
            </div>
            <div className="relative mt-[6%]">
                <input type="range" step={1} min={12} max={32} className="range h-3 w-full  mx-[1%] accent-neutral-200 cursor-pointer appearance-none rounded-lg border-neutral-500 border-[1px] bg-bgdark"
                    value={rangeValue}
                    onMouseDown={beginAdjustment}
                    onMouseUp={endAdjustment}
                    onChange={handleRangeChange}>

                </input>
                {hideRangeValue && (
                    <label
                    style={{ left: `${((rangeValue-12)/21) * 100}%` }}
                    className="absolute transform -translate-y-full w-[7%] top-0 text-center bg-gray-200 px-1 rounded text-sm font-agrandir pt-[1%]"
                    >
                    {rangeValue}
                    </label>
                )}
            </div>

            <TuningFrequencyEditor microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch}/>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[9%]">MIDI
                DEVICE
            </div>
            <div className="flex w-full h-11 mt-[2%]">
                <select data-te-select-init className="w-full rounded-md font-agrandir pl-[2%]">
                    <option value="1">MIDI Device 1</option>
                    <option value="2">MIDI Device 2</option>
                    <option value="3">MIDI Device 3</option>
                    <option value="4">MIDI Device 4</option>
                </select>
            </div>            
        </div>
    )

}