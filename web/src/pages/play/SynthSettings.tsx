import * as React from "react";
import Oscillator from "../../ui/Oscillator";
import Knobs from "../../ui/Knobs";
import InstrumentPresets from "../../ui/InstrumentPresets";
import {SynthConfig} from "../../utility/MicrotonalConfig";
import {OscillatorSettings} from "../../utility/audio/OscillatorSettings";
import {MCActions} from "./Reducers";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {useMCDispatch, useMConfig} from "./PlayProvider";

const textClassName = "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal text-white text-center"

export default function SynthSettings(): ReactJSXElement {

    const synthConfig: SynthConfig = useMConfig().synthConfig;
    const mcDispatch: Function = useMCDispatch();

    const handleAttackChange = (value: number): void => {
        mcDispatch({type: MCActions.SET_ATTACK, attack: value});
    }

    const handleDecayChange = (value: number): void => {
        mcDispatch({type: MCActions.SET_DECAY, decay: value});
    }

    const handleSustainChange = (value: number): void => {
        mcDispatch({type: MCActions.SET_SUSTAIN, sustain: value});
    }

    const handleReleaseChange = (value: number): void => {
        mcDispatch({type: MCActions.SET_RELEASE, release: value});
    }

    const mapOscillators = (): ReactJSXElement[] => {
        let oscJSX: ReactJSXElement[] = [];
        let oscillators: OscillatorSettings[] = synthConfig.oscillators;

        for (let i = 0; i < oscillators.length; i++) {
            oscJSX.push(
                <Oscillator
                    key={i}
                    oscIndex={i}
                    settings={synthConfig.oscillators[i]}
                />
            );
        }

        return oscJSX;
    }

    return  <div className="flex h-full w-full border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight">

                <div className="flex h-full p-4">

                    <div className="flex mx-2 ml-0">
                        <div className="flex">
                            <div>
                                <Knobs
                                    knobLabel={'Attack'}
                                    value={synthConfig.attack}
                                    onChange={(value: number) => handleAttackChange(value)}
                                    className={'border-gold border-2'}
                                />
                            </div>
                            <div className={'ml-2'}>
                                <Knobs
                                    knobLabel={'Decay'}
                                    value={synthConfig.decay}
                                    onChange={(value: number) => handleDecayChange(value)}
                                    className={'border-gold border-2'}
                                />
                            </div>
                            <div className={'ml-2'}>
                                <Knobs
                                    knobLabel={'Sustain'}
                                    value={synthConfig.sustain}
                                    onChange={(value: number) => handleSustainChange(value)}
                                    className={'border-gold border-2'}
                                />
                            </div>
                            <div className={'ml-2'}>
                                <Knobs
                                    knobLabel={'Release'}
                                    value={synthConfig.release}
                                    onChange={(value: number) => handleReleaseChange(value)}
                                    className={'border-gold border-2'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row mx-2 p-4 pt-6 bg-neutral-700 rounded-xl border-gold border-2">
                        {mapOscillators()}
                    </div>

                    <div className="flex flex-col mx-2 mr-0">
                        <div className="border-gold border-2 rounded-t-xl font-agrandir-wide text-white text-center bg-neutral-700">
                            <div>Instrument </div>
                            <div>Presets</div>
                        </div>
                        <div className="flex flex-col bg-neutral-700 rounded-b-xl border-gold border-2 border-t-0 h-full w-40 overflow-auto">
                            <InstrumentPresets />
                        </div>
                    </div>

                </div>

            </div>;
}
