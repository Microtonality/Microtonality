import * as React from "react";
import { useState } from "react";
import OscillatorSettings from "../utility/audio/OscillatorSettings";

interface OscillatorProps {
    settings: OscillatorSettings;
    onChange: (value: OscillatorSettings) => void;
}

const defaultProps = {
    settings: new OscillatorSettings(1, 0.5, "sine"),
}

export default function Oscillator(props: OscillatorProps) {

    const [value, setValue] = useState<number>(0)

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(event.currentTarget.value)
        if (val > 1.00) val = 1.00
        setValue(val)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(event.currentTarget.value)
        if (val > 1.00) val = 1.00
        setValue(parseFloat(val.toFixed(2)))
    }
    
    return (
        <div className="flex flex-col h-full w-full items-center justify-around">

            <select data-te-select-init className="flex w-[80%] h-[7%] rounded-md text-center font-agrandir">
                <option value="sine">SINE</option>
                <option value="square">SQUARE</option>
                <option value="triangle">TRIANGLE</option>
                <option value="sawtooth">SAWTOOTH</option>
            </select>
            
            <input
                type="range"
                className="transparent h-[2%] w-[200%] my-[80%] cursor-pointer appearance-none rounded-lg border-neutral-500 border-[1px] bg-bgdark transform -rotate-90 accent-neutral-200"
                id="customRange1" 
                onChange={handleSliderChange}
                value={value}
                min={0}
                max={1}
                step={0.01}
            />

            <input  
                className={"text-center self-center w-[80%] rounded-md font-agrandir"} 
                type="number" 
                value={value} 
                onChange={handleInputChange} 
                min={0} 
                max={1} 
                step={0.01}
            />
        </div>
    )
}

Oscillator.defaultProps = defaultProps;