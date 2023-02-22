import {createMicrotonalConfig, MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";

const setTuningFrequency = (microtonalConfig: MicrotonalConfig, baseFrequency: number) => {
    let scaleConfig = {...microtonalConfig.scaleConfig, baseFrequency: baseFrequency} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}



export {setTuningFrequency}
