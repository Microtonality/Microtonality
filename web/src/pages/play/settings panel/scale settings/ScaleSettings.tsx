import * as React from "react";
import { Scale } from "../../../../utility/microtonal/Scale";
import TuningFrequencyEditor from "../TuningFrequencyEditor";
import ScaleEditor from "./scale editor/ScaleEditor";
import ScalaFileHandler from "./ScalaFileHandler";

interface ScaleSettingsProps {
    scale: Scale;
    tuningFrequency: number;
    mcDispatch: Function;
    displayErrorMsg: (msg: string) => void;
}

// The ScaleSettings contains file upload and download for Scala files (.scl),
// a TuningFrequencyEditor, and all the notes in the current scale.
export default function ScaleSettings(props: ScaleSettingsProps) {

    return (
        <div className={'flex flex-col'}>
                <TuningFrequencyEditor
                    tuningFrequency={props.tuningFrequency}
                    mcDispatch={props.mcDispatch}
                />

                <ScalaFileHandler
                    scale={props.scale}
                    mcDispatch={props.mcDispatch}
                    displayErrorMsg={props.displayErrorMsg}
                />

                <ScaleEditor
                    scale={props.scale}
                    mcDispatch={props.mcDispatch}
                />
        </div>
    );
};