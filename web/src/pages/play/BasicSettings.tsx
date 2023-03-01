import * as React from "react";
import {Button, } from "@mui/material";
import {ScaleConfig} from "../../utility/MicrotonalConfig";

interface BasicSettingsProps {
    scaleConfig: ScaleConfig
}

export default function BasicSettings(props: BasicSettingsProps) {

    return(
        <div>
            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%]">
                    EQUAL-TEMPERED SCALE
            </div>
            <input type="range" step={1} min={12} max={32} className="range w-full mt-[2%]"></input>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[10%]">BASE
                FREQUENCY
            </div>
            <div className="flex w-full h-11 mt-[2%]">
                <input type="number" step="0.0001" className="w-full rounded-md font-agrandir pl-[2%]" />
            </div>

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