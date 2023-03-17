import * as React from "react";
import { useState } from "react";
import OscillatorSettings from "../utility/audio/OscillatorSettings";
import { Range, Direction } from 'react-range';
import Knob from "./Knobs";

interface OscillatorProps {
    settings: OscillatorSettings;
    onChange: (value: OscillatorSettings) => void;
}

const defaultProps = {
    settings: new OscillatorSettings(1, 0.5, "sine"),
}

export default function Oscillator(props: OscillatorProps) {

    const [value, setValue] = useState<number[]>([0.5])

    const handleSliderChange = (val: number[]) => {
        if (val[0] > 1.00) val[0] = 1.00
        setValue(val)

        let newSettings = new OscillatorSettings(props.settings.pitchRatio, val[0], props.settings.waveType)
        props.onChange(newSettings)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val : number[] = []
        val[0] = parseFloat(event.currentTarget.value)
        if (val[0] > 1.00) val[0] = 1.00
        setValue(val)

        let newSettings = new OscillatorSettings(props.settings.pitchRatio, val[0], props.settings.waveType)
        props.onChange(newSettings)
    }

    const handleWaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let val = event.currentTarget.value;

        switch (val) {
            case "sine":
                props.settings.waveType = "sine"
                break
            case "square":
                props.settings.waveType = "square"
                break
            case "triangle":
                props.settings.waveType = "triangle"
                break
            case "sawtooth":
                props.settings.waveType = "sawtooth"
                break
            default:
        }
        
        props.onChange(props.settings)
    }

    const changeMultiplier = (value: number) => {
        return;
    }

    return (
        <div className="flex flex-col items-center justify-between">

            <select data-te-select-init className="flex h-6 w-[80%] rounded-md text-center font-agrandir" onChange={handleWaveTypeChange}>
                <option value="sine">SINE</option>
                <option value="square">SQUARE</option>
                <option value="triangle">TRIANGLE</option>
                <option value="sawtooth">SAWTOOTH</option>
            </select>

            <Range
            step={0.01}
            min={0}
            max={1}
            values={value}
            onChange={handleSliderChange}
            direction={Direction.Up}
            renderTrack={({ props, children }) => (
                <div
                {...props}
                style={{
                    ...props.style,
                    border: '1px solid',
                    borderColor: 'gray',
                    borderRadius: '10px',
                    height: '60%',
                    width: '10%',
                    backgroundColor: '#212121',
                    marginTop: '10%',
                    marginBottom: '20%'
                }}
                >
                {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                {...props}
                style={{
                    ...props.style,
                    width: '1rem',
                    height: '1rem',
                    border: '1px-solid',
                    backgroundColor: 'white',
                    borderRadius: '100%'
                }}
                />
            )}
            />

            <input  
                className={"text-center w-[60%] self-center rounded-md font-agrandir"} 
                type="number" 
                value={value[0]} 
                onChange={handleInputChange} 
                min={0} 
                max={1} 
                step={0.01}
            />

            <div className="h-[10vw] w-[3.5vw]">
                <Knob 
                    max={16}
                    value={props.settings.pitchRatio}
                    onChange={(value) => changeMultiplier(value)} 
                    knobLabel=""
                    className=""
                />
            </div>
        </div>
    )
}

Oscillator.defaultProps = defaultProps;