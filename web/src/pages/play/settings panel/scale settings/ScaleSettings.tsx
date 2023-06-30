import * as React from "react";
import TuningFrequencyEditor from "../elements/TuningFrequencyEditor";
import ScalaFileHandler from "./scala files/ScalaFileHandler";
import {useMConfig} from "../../PlayProvider";
import ScaleEditor from "./scale editor/ScaleEditor";
import Animator from "../elements/animations/Animator";
import {FadeInAndOut} from "../elements/animations/Animations";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function ScaleSettings(): ReactJSXElement {

    const tuningFreq: number = useMConfig().scaleConfig.tuningFrequency;

    return (
        <div className={'flex flex-col'}>
            <TuningFrequencyEditor key={tuningFreq} />

            <Animator animation={FadeInAndOut}>
                <ScalaFileHandler />
            </Animator>

            <ScaleEditor />
        </div>
    );
};