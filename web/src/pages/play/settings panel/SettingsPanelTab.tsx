import BasicSettings from "./basic settings/BasicSettings";
import ScaleSettings from "./scale settings/ScaleSettings";
import * as React from "react";
import {MicrotonalConfig} from "../../../utility/MicrotonalConfig";

interface SettingsPanelTabProps {
    currentTab: number;
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
    displayErrorMsg: (msg: string) => void;
}

export default function SettingsPanelTab(props: SettingsPanelTabProps) {

    return (
        <div className={'my-1.5 px-2 rounded-2xl overflow-y-auto'}>
            {(props.currentTab === 0) ?
                <BasicSettings
                    microtonalConfig={props.microtonalConfig}
                    mcDispatch={props.mcDispatch}
                    displayErrorMsg={props.displayErrorMsg}
                />
            :
                <ScaleSettings
                    scale={props.microtonalConfig.scaleConfig.scale}
                    tuningFrequency={props.microtonalConfig.scaleConfig.tuningFrequency}
                    mcDispatch={props.mcDispatch}
                    displayErrorMsg={props.displayErrorMsg}
                />
            }
        </div>
    );
}