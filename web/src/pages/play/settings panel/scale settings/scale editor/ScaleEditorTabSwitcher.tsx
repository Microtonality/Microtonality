import * as React from "react";
import SVGButton, {SVGButtons} from "../../elements/SVGButton";
import {useScaleEditorTab, useSetScaleEditorTab} from "../../SettingsPanelProvider";
import {ScaleEditorTab} from "../../SettingsPanelContext";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function ScaleEditorTabSwitcher(): ReactJSXElement {

    const currentTab: ScaleEditorTab = useScaleEditorTab();
    const setCurrentTab: React.Dispatch<React.SetStateAction<ScaleEditorTab>> = useSetScaleEditorTab();

    const svg: SVGButtons = (currentTab === ScaleEditorTab.VISUAL) ? SVGButtons.pencilSquare : SVGButtons.listBullet;

    const switchTab = (): void => {
        setCurrentTab((prev: ScaleEditorTab) =>
            (prev === ScaleEditorTab.VISUAL) ? ScaleEditorTab.SCALA : ScaleEditorTab.VISUAL
        );
    }

    return (
        <SVGButton
            className={'ml-px'}
            svg={svg}
            onClick={switchTab}
        />
    );
}