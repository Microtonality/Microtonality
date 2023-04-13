import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {OscillatorSettings} from "../utility/audio/OscillatorSettings";
import { Range, Direction } from 'react-range';
import Knob from "./Knobs";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {MicrotonalConfig} from "../utility/MicrotonalConfig";
import {MCActions} from "../pages/play/Reducers";

interface OscillatorProps {
    oscIndex: number;
    settings: OscillatorSettings;
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
}

export default function Oscillator(props: OscillatorProps) {

    let [localGain, setLocalGain] = useState<number>(props.settings.localGain);
    let [localGainInput, setLocalGainInput] = useState<string>(props.settings.localGain.toString());
    const gainInputRef = useRef<HTMLInputElement>(null);
    const supportedWaveTypes: Array<string> = ['sine', 'square', 'triangle', 'sawtooth'];

    // Wave Type (dropdown menu)
    const handleWaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let wave: string = event.currentTarget.value;
        if (!supportedWaveTypes.includes(wave))
            return;

        let newOsc = {...props.settings, waveType: wave} as OscillatorSettings;
        updateOscillator(newOsc);
    }

    const mapWaveTypes = (): ReactJSXElement[] => {
        let wavesJSX: ReactJSXElement[] = [];

        supportedWaveTypes.forEach((waveType, i) => {
            wavesJSX.push(
                <option value={waveType} key={i}>{waveType.toUpperCase()}</option>
            );
        });

        return wavesJSX;
    }

    // Local Gain (slider and input field)
    useEffect(() => {
        setLocalGain(props.settings.localGain);
    }, [props.microtonalConfig]);

    useEffect(() => {
        setLocalGainInput(localGain.toString());
    }, [localGain]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            gainInputRef.current.blur();
            submitLocalGainInput();
            return;
        }
    }

    const submitLocalGainInput = () => {
        let gain: number = clampGain(parseFloat(localGainInput));
        if (isNaN(gain) || gain === localGain) {
            setLocalGainInput(localGain.toString());
            return;
        }

        let newOsc = {...props.settings, localGain: gain} as OscillatorSettings;
        updateOscillator(newOsc);


        // If the last element the user clicked on is the slider,
        // the values of it will change with the J and K keys, which
        // we need mapped to piano keys. React's Range does not allow
        // for blur() or any onMouseUp events, so we will focus another
        // element instead, here being the input field just below the range.
        // This not only fixes the issue but also allows for small changes
        // to be made by the user quickly in case they are unable to set
        // the value they want from the slider, but can still get close to that value.

        // Additionally, an input type of 'number' does not
        // allow for setting the location of the cursor.
        // As such, we must change it to a 'text' type for a bit.
        // This is to ensure that the cursor is at the end of the
        // input every time it is focused.
        gainInputRef.current.focus();
        gainInputRef.current.setAttribute('type', 'text');
        gainInputRef.current.selectionStart = gain.toString().length;
        gainInputRef.current.selectionEnd = gain.toString().length;
        gainInputRef.current.setAttribute('type', 'number');
    }

    const clampGain = (gain: number): number => {
        return Math.min(1, Math.max(0, gain));
    }

    // Pitch Multiplier (knob and input field)
    const handleMultiplierSubmit = (value: number) => {
        let newOsc = {...props.settings, pitchRatio: value} as OscillatorSettings;
        updateOscillator(newOsc);
    }

    // Actions
    const updateOscillator = (osc: OscillatorSettings) => {
        props.mcDispatch({type: MCActions.SET_OSCILLATOR, osc: osc, oscIndex: props.oscIndex});
    }

    return (
        <div className="flex h-[95%] flex-col items-center justify-between mr-1">

            <select data-te-select-init value={props.settings.waveType} className="flex h-8 w-full pt-0.5 rounded-md text-center font-agrandir text-sm" onChange={(e) => handleWaveTypeChange(e)}>
                {mapWaveTypes()}
            </select>

            <Range
            step={0.01}
            min={0}
            max={1}
            values={[((localGainInput === '') ? 0 : clampGain(parseFloat(localGainInput)))]}
            onChange={(values) => setLocalGainInput(values[0].toString())}
            onFinalChange={() => submitLocalGainInput()}
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
                className={"text-center w-3/4 self-center rounded-md font-agrandir text-sm pt-0.5"} 
                type="number"
                ref={gainInputRef}
                value={localGainInput}
                onChange={(e) => setLocalGainInput(e.target.value)}
                onBlur={() => submitLocalGainInput()}
                onKeyDown={(e) => handleKeyDown(e)}
                min={0} 
                max={1} 
                step={0.01}
            />

            <div className="h-[10vw] w-[3.5vw]">
                <Knob
                    min={0}
                    max={16}
                    value={props.settings.pitchRatio}
                    onChange={(value) => handleMultiplierSubmit(value)}
                    knobLabel=""
                    className=""
                />
            </div>
        </div>
    )
}
