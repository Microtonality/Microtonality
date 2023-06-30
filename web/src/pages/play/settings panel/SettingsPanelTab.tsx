import BasicSettings from "./basic settings/BasicSettings";
import ScaleSettings from "./scale settings/ScaleSettings";
import * as React from "react";
import {SettingsPanelTabs} from "./SettingsPanelProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface SettingsPanelTabProps {
    currentTab: SettingsPanelTabs;
}

export default function SettingsPanelTab(props: SettingsPanelTabProps): ReactJSXElement {

    return (
        <div className={'my-1.5 px-2 rounded-2xl overflow-y-auto'}>
            {props.currentTab === SettingsPanelTabs.BASIC &&
                <BasicSettings />
            }

            {props.currentTab === SettingsPanelTabs.SCALE &&
                <ScaleSettings />
            }
        </div>
    );
}