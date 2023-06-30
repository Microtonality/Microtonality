import * as React from "react";
import {useState} from 'react';
import { MCActions } from "../pages/play/Reducers";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {useMCDispatch} from "../pages/play/PlayProvider";

export default function InstrumentPresets(): ReactJSXElement {

    const mcDispatch: Function = useMCDispatch();

    const [preset, setPreset] = useState("Custom");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        mcDispatch({type: MCActions.SET_PRESET, preset: e.target.value});
    }

    // useEffect(() => {
    //     console.log(preset)
    // }, [preset])

    return(
            <div className="flex flex-col m-2 font-agrandir text-black text-md" onChange={onChange}>
                <select className="flex rounded-md py-1 justify-center items-center">
                    <option>Custom</option>
                    <option>Basic</option>
                    <option>Piano</option>
                    <option>Flute</option>
                    <option>Clarinet</option>
                    <option>Trumpet</option>
                    <option>Tuba</option>
                    <option>Violin</option>
                </select>
            </div>
    )
}