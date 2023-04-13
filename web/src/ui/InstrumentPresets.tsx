import * as React from "react";
import {useState, useEffect} from 'react';
import { MCActions } from "../pages/play/Reducers";
import { MicrotonalConfig } from "../utility/MicrotonalConfig";

interface InstrumentPresetProps {
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function InstrumentPresets(props: InstrumentPresetProps) {
    const [preset, setPreset] = useState("Custom")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.mcDispatch({type: MCActions.SET_PRESET, preset: e.target.value});
    }

    useEffect(() => {
        console.log(preset)
    }, [preset])

    return(
            <div className="flex flex-col m-2 font-agrandir text-black text-md" onChange={onChange}>
                <select className="flex rounded-md py-1 justify-center items-center">
                    <option>Custom</option>
                    <option>Piano</option>
                    <option>Flute</option>
                    <option>Oboe</option>
                    <option>Clarinet</option>
                    <option>Bassoon</option>
                    <option>Trumpet</option>
                    <option>French Horn</option>
                    <option>Trombone</option>
                    <option>Tuba</option>
                    <option>Violin</option>
                    <option>Cello</option>
                    <option>Viola</option>
                </select>
            </div>
    )
}