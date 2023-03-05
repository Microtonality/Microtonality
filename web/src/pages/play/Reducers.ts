import {createMicrotonalConfig, MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";

const setTuningFrequency = (microtonalConfig: MicrotonalConfig, baseFrequency: number) => {
    let scaleConfig = {...microtonalConfig.scaleConfig, baseFrequency: baseFrequency} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const setAttack = (microtonalConfig: MicrotonalConfig, attack: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, attack: attack} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

export {setTuningFrequency, setAttack}
