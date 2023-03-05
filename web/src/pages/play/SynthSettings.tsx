import * as React from "react";
import Oscillator from "../../ui/Oscillator";
import Knobs from "../../ui/Knobs";
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import OscillatorSettings from "../../utility/audio/OscillatorSettings";
import { setAttack } from "./Reducers";

interface SynthProps {
    microtonalConfig: MicrotonalConfig,
    setMicrotonalConfig: Function
}

const textClassName = "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal text-white text-center"

export default function SynthSettings(props: SynthProps) {

    const handleAttackChange = (value: number) => {
        setAttack(props.microtonalConfig, value);
    }

    return  <div className="h-full w-full bottom-0 border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight">
                <div className="flex">
                    <div className="mt-[1%] flex flex-col w-1/3 justify-around">
                        <div className="flex">
                            <Knobs knobLabel="Attack" onChange={(value) => handleAttackChange(value)} />
                            <Knobs knobLabel="Decay" onChange={(value) => console.log(value)} />
                        </div>
                        <div className="flex">
                            <Knobs knobLabel="Sustain" onChange={(value) => this.props.synthConfig.sustain = value } />
                            <Knobs knobLabel="Release" onChange={(value) => this.props.synthConfig.release = value} />
                        </div>
                    </div>

                    <div className="flex flex-row ml-[4%]">
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[0] = value} />
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[1] = value} />
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[2] = value} />
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[3] = value} />
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[4] = value} />
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[5] = value} />
                        <Oscillator onChange={(value) => this.props.synthConfig.oscillators[6] = value} />
                    </div>
                </div>
            </div>;
}

