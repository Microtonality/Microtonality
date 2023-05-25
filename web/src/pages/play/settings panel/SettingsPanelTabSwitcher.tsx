import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import * as React from "react";
import {SettingsTabs} from "./SettingsPanel";

interface SettingsPanelTabSwitcherProps {
    currentTab: SettingsTabs;
    setCurrentTab: (tab: SettingsTabs) => void;
}

export default function SettingsPanelTabSwitcher(props: SettingsPanelTabSwitcherProps) {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            if (props.currentTab === SettingsTabs.BASIC)
                props.setCurrentTab(SettingsTabs.SCALE);
            else
                props.setCurrentTab(SettingsTabs.BASIC);
        }
    }

    const basicTab = (): ReactJSXElement => {
        if (props.currentTab === SettingsTabs.SCALE) {
            return (
                <li tabIndex={0}
                    className={'settings-tab-inactive settings-tab-l'}
                    onClick={() => props.setCurrentTab(SettingsTabs.BASIC)}
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    BASIC
                </li>
            );
        }

        return (
            <li className={'settings-tab-active settings-tab-l'}>
                BASIC
                <div className={'settings-tab-hook-parent-l'}>
                    <div className={'settings-tab-hook-l'}/>
                </div>
            </li>
        );
    }

    const scaleTab = (): ReactJSXElement => {
        if (props.currentTab === SettingsTabs.BASIC) {
            return (
                <li tabIndex={0}
                    className={'settings-tab-inactive settings-tab-r'}
                    onClick={() => props.setCurrentTab(SettingsTabs.SCALE)}
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    SCALE
                </li>
            );
        }

        return (
            <li className={'settings-tab-active settings-tab-r'}>
                SCALE
                <div className={'settings-tab-hook-parent-r'}>
                    <div className={'settings-tab-hook-r'}/>
                </div>
            </li>
        );
    }

    return (
        <ul className={'flex flex-row text-center'}>
            {basicTab()}
            {scaleTab()}
        </ul>
    );
}