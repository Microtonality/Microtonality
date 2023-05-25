import * as React from "react";
import {MicrotonalConfig} from "../../../utility/MicrotonalConfig";
import {useState} from "react";
import SettingsFieldTitle from "./SettingsFieldTitle";
import SettingsPanelTabSwitcher from "./SettingsPanelTabSwitcher";
import SettingsPanelTab from "./SettingsPanelTab";

interface SettingsPanelProps {
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
    displayErrorMsg: (msg: string) => void;
}

export default function SettingsPanel(props: SettingsPanelProps) {

    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div className={'flex flex-col w-full h-full border-t-2 border-r-2 border-gold rounded-tr-xl bg-bglight dark:bg-bgdark'}>
            <div className={'pt-3 pb-2 text-center'}>
                <SettingsFieldTitle text={'SETTINGS'}/>
            </div>

            <SettingsPanelTabSwitcher
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />

            <SettingsPanelTab
                currentTab={currentTab}
                microtonalConfig={props.microtonalConfig}
                mcDispatch={props.mcDispatch}
                displayErrorMsg={props.displayErrorMsg}
            />
        </div>
    );
}