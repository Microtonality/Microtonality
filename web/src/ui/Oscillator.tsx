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

    const supportedWaveTypes: Array<string> = ['sine', 'square', 'triangle', 'sawtooth'];
    const [localGain, setLocalGain] = useState<string>(props.settings.localGain.toString());
    const gainInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLocalGain(props.settings.localGain.toString());
    }, [props.settings.localGain])

    const updateOscillator = (osc: OscillatorSettings) => {
        props.mcDispatch({type: MCActions.SET_OSCILLATOR, osc: osc, oscIndex: props.oscIndex});
    }

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

    const handleGainSliderChange = (values: number[]) => {
        setLocalGain(clampGain(values[0]).toString());
    }

    const handleGainInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            setLocalGain('');
            return;
        }

        let gain: number = clampGain(parseFloat(event.target.value));
        setLocalGain(gain.toString());
    }

    const handleGainSubmit = () => {
        let newOsc = {...props.settings, localGain: parseFloat(localGain)} as OscillatorSettings;
        updateOscillator(newOsc);
    }

    const clampGain = (gain: number): number => {
        return Math.min(1, Math.max(0, gain));
    }

    const handleMultiplierSubmit = (value: number) => {
        let newOsc = {...props.settings, pitchRatio: value} as OscillatorSettings;
        updateOscillator(newOsc);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            gainInputRef.current.blur();
            handleGainSubmit();
            return;
        }
    }

    return (
        <div className="flex flex-col items-center justify-between">

            <select data-te-select-init value={props.settings.waveType} className="flex h-6 w-[80%] rounded-md text-center font-agrandir" onChange={(e) => handleWaveTypeChange(e)}>
                {mapWaveTypes()}
            </select>

            <Range
            step={0.01}
            min={0}
            max={1}
            values={[((localGain === '') ? 0 : parseFloat(localGain))]}
            onChange={(values) => handleGainSliderChange(values)}
            onFinalChange={() => handleGainSubmit()}
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
                ref={gainInputRef}
                value={(localGain === '') ? '' : parseFloat(localGain)}
                onChange={(e) => handleGainInputChange(e)}
                onBlur={() => handleGainSubmit()}
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
