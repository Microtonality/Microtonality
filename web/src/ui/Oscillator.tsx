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

        let newSettings = new OscillatorSettings(props.settings.pitchRatio, val, props.settings.waveType)
        props.onChange(newSettings)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(event.currentTarget.value)
        if (val > 1.00) val = 1.00
        setValue(parseFloat(val.toFixed(2)))

        let newSettings = new OscillatorSettings(props.settings.pitchRatio, val, props.settings.waveType)
        props.onChange(newSettings)
    }

    const handleWaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let val = event.currentTarget.value;

        switch (val) {
            case "SINE":
                props.settings.waveType = "sine"
            case "SQUARE":
                props.settings.waveType = "square"
            case "TRIANGLE":
                props.settings.waveType = "triangle"
            case "SAWTOOTH":
                props.settings.waveType = "sawtooth"
        }

        props.onChange(props.settings)
    }

    return (
        <div className="flex flex-col items-center justify-between">

            <select data-te-select-init className="flex h-6 w-[80%] rounded-md text-center font-agrandir" onChange={handleWaveTypeChange}>
                <option value="sine">SINE</option>
                <option value="square">SQUARE</option>
                <option value="triangle">TRIANGLE</option>
                <option value="sawtooth">SAWTOOTH</option>
            </select>
            
            <input
                type="range"
                className="h-3 w-full accent-neutral-200 cursor-pointer appearance-none rounded-lg border-neutral-500 border-[1px] bg-bglight transform -rotate-90 aspect-auto"
                id="customRange1" 
                onChange={handleSliderChange}
                value={value}
                min={0}
                max={1}
                step={0.01}
            />

            <input  
                className={"text-center w-[60%] self-center rounded-md font-agrandir"} 
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