import * as React from "react";
import {useState} from "react";
import SettingsFieldTitle from "./elements/SettingsFieldTitle";
import SettingsPanelTabSwitcher from "./SettingsPanelTabSwitcher";
import SettingsPanelTab from "./SettingsPanelTab";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {SettingsPanelTabs} from "./SettingsPanelProvider";

export default function SettingsPanel(): ReactJSXElement {

    const [currentTab, setCurrentTab] = useState<SettingsPanelTabs>(SettingsPanelTabs.BASIC);

    return (
        <div className={'flex flex-col w-full h-full border-t-2 border-r-2 border-gold rounded-tr-xl bg-bglight'}>
            <div className={'pt-3 pb-2 text-center'}>
                <SettingsFieldTitle text={'SETTINGS'}/>
            </div>

            <SettingsPanelTabSwitcher
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />

            <SettingsPanelTab
                currentTab={currentTab}
            />
        </div>
    );
}