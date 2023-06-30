import * as React from "react";
import TuningFrequencyEditor from "../elements/TuningFrequencyEditor";
import EqualTemperedScaleSlider from "./EqualTemperedScaleSlider";
import SynthFileHandler from "./synth files/SynthFileHandler";
import {useMConfig} from "../../PlayProvider";
import {FadeInAndOut} from "../elements/animations/Animations";
import Animator from "../elements/animations/Animator";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function BasicSettings(): ReactJSXElement {

    const tuningFreq: number = useMConfig().scaleConfig.tuningFrequency;

    return(
        <div className={'flex flex-col'}>
            <TuningFrequencyEditor key={tuningFreq} />

            <Animator animation={FadeInAndOut}>
                <SynthFileHandler />
            </Animator>

            <EqualTemperedScaleSlider />
        </div>
    )
}
