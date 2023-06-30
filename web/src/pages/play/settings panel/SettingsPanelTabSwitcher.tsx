import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import * as React from "react";
import {SettingsPanelTabs} from "./SettingsPanelProvider";

interface SettingsPanelTabSwitcherProps {
    currentTab: number;
    setCurrentTab: (tab: number) => void;
}

export default function SettingsPanelTabSwitcher(props: SettingsPanelTabSwitcherProps): ReactJSXElement {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            props.setCurrentTab(
                props.currentTab === SettingsPanelTabs.BASIC ?
                    SettingsPanelTabs.SCALE :
                    SettingsPanelTabs.BASIC
            );
        }
    }

    const basicTab = (): ReactJSXElement => {
        if (props.currentTab === 1) {
            return (
                <li tabIndex={0}
                    className={'settings-tab-inactive settings-tab-l'}
                    onClick={() => props.setCurrentTab(0)}
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
        if (props.currentTab === 0) {
            return (
                <li tabIndex={0}
                    className={'settings-tab-inactive settings-tab-r'}
                    onClick={() => props.setCurrentTab(1)}
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