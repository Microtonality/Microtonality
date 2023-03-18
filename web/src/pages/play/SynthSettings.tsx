import * as React from "react";
import Oscillator from "../../ui/Oscillator";
import Knobs from "../../ui/Knobs";
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import {OscillatorSettings} from "../../utility/audio/OscillatorSettings";
import {MCActions} from "./Reducers";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface SynthProps {
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

const textClassName = "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal text-white text-center"

export default function SynthSettings(props: SynthProps) {

    const handleAttackChange = (value: number) => {
        props.mcDispatch({type: MCActions.SET_ATTACK, attack: value});
    }

    const handleDecayChange = (value: number) => {
        props.mcDispatch({type: MCActions.SET_DECAY, decay: value});
    }

    const handleSustainChange = (value: number) => {
        props.mcDispatch({type: MCActions.SET_SUSTAIN, sustain: value});
    }

    const handleReleaseChange = (value: number) => {
        props.mcDispatch({type: MCActions.SET_RELEASE, release: value});
    }

    const handleOscillatorChanges = (settings: OscillatorSettings, index: number) => {
        props.mcDispatch({type: MCActions.SET_OSCILLATOR, osc: settings, oscIndex: index});
    }

    const mapOscillators = (): ReactJSXElement[] => {
        let oscJSX: ReactJSXElement[] = [];
        let oscillators = props.microtonalConfig.synthConfig.oscillators;

        for (let i = 0; i < oscillators.length; i++) {
            oscJSX.push(
                <Oscillator key={i}
                            oscIndex={i}
                            settings={props.microtonalConfig.synthConfig.oscillators[i]}
                            microtonalConfig={props.microtonalConfig}
                            mcDispatch={props.mcDispatch}/>
            );
        }

        return oscJSX;
    }

    return  <div className="flex h-full w-full border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight justify-around">

                <div className="flex h-full">

                    <div className="flex p-[2%]">
                        <div className="flex w-[70%]">
                            <div className="">
                                <Knobs knobLabel="Attack" value={props.microtonalConfig.synthConfig.attack} onChange={(value) => handleAttackChange(value)} className="border-gold border-[3px]"/>
                            </div>
                            <div className="ml-[2%]">
                                <Knobs knobLabel="Decay" value={props.microtonalConfig.synthConfig.decay} onChange={(value) => handleDecayChange(value)} className="border-gold border-[3px]"/>
                            </div>
                            <div className="ml-[2%]"> 
                                <Knobs knobLabel="Sustain" value={props.microtonalConfig.synthConfig.sustain} onChange={(value) => handleSustainChange(value)} className="border-gold border-[3px]"/>
                            </div>
                            <div className="ml-[2%]">
                                <Knobs knobLabel="Release" value={props.microtonalConfig.synthConfig.release} onChange={(value) => handleReleaseChange(value)} className="border-gold border-[3px]"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row mx-[2%] mt-[2%] mb-[3%] p-[2%] bg-neutral-700 rounded-xl border-gold border-[3px] overflow-hidden">
                        {mapOscillators()}
                    </div>

                </div>

            </div>;
}
