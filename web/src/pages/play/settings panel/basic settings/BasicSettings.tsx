import * as React from "react";
import {MicrotonalConfig} from "../../../../utility/MicrotonalConfig";
import TuningFrequencyEditor from "../TuningFrequencyEditor";
import EqualTemperedScaleSlider from "./EqualTemperedScaleSlider";
import SynthFileHandler from "./SynthFileHandler";

interface BasicSettingsProps {
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
    displayErrorMsg: (msg: string) => void;
}

export default function BasicSettings(props: BasicSettingsProps) {

    return(
        <div className={'flex flex-col'}>
            <TuningFrequencyEditor
                tuningFrequency={props.microtonalConfig.scaleConfig.tuningFrequency}
                mcDispatch={props.mcDispatch}
            />

            <SynthFileHandler
                microtonalConfig={props.microtonalConfig}
                mcDispatch={props.mcDispatch}
                displayErrorMsg={props.displayErrorMsg}
            />

            <EqualTemperedScaleSlider
                scale={props.microtonalConfig.scaleConfig.scale}
                mcDispatch={props.mcDispatch}
            />
        </div>
    )
}
