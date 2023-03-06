import {createMicrotonalConfig, MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import OscillatorSettings from "../../utility/audio/OscillatorSettings";

const setTuningFrequency = (microtonalConfig: MicrotonalConfig, baseFrequency: number) => {
    let scaleConfig = {...microtonalConfig.scaleConfig, baseFrequency: baseFrequency} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const setAttack = (microtonalConfig: MicrotonalConfig, attack: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, attack: attack} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setDecay = (microtonalConfig: MicrotonalConfig, decay: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, decay: decay} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setSustain = (microtonalConfig: MicrotonalConfig, sustain: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, sustain: sustain} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setRelease = (microtonalConfig: MicrotonalConfig, release: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, release: release} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setOscillator = (microtonalConfig: MicrotonalConfig, oscillator: OscillatorSettings, oscIndex: number) => {
    let newOscillators = microtonalConfig.synthConfig.oscillators;
    newOscillators[oscIndex] = oscillator;
    let synthConfig = {...microtonalConfig.synthConfig, oscillators: newOscillators} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

export {setTuningFrequency, setAttack, setDecay, setSustain, setRelease, setOscillator}
