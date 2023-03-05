import * as React from "react";
import OscillatorSettings from "../utility/audio/OscillatorSettings";

interface OscillatorProps {
    settings: OscillatorSettings;
    onChange: (value: OscillatorSettings) => void;
}

const defaultProps = {
    settings: new OscillatorSettings(1, 0.5, "sine"),
}

export default function Oscillator(props: OscillatorProps) {

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
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
                className="transparent h-[1%] w-[200%] my-[80%] cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200 transform -rotate-90"
                id="customRange1" 
                onChange={handleSliderChange}
            />

            <input  
                className={"text-center self-center w-[80%] rounded-md font-agrandir"} 
                type="number" 
                value={0.5}
                onChange={handleInputChange} 
                min={0} 
                max={1}
            />
        </div>
    )
}

Oscillator.defaultProps = defaultProps;

{/* <Slider
    sx={{
    '& input[type="range"]': {
        WebkitAppearance: 'slider-vertical',
    },
        color: 'white'
}}
    id="pitch_ratio"
    orientation="vertical"
    defaultValue={0}
    aria-label="Slider2"
    valueLabelDisplay="auto"
/> */}