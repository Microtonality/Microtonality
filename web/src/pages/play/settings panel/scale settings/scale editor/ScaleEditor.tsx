import * as React from "react";
import VisualScaleEditor from "./visual editor/VisualScaleEditor";
import ScalaFileEditor from "./ScalaFileEditor";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ScaleEditorTab} from "../../SettingsPanelContext";
import {useScaleEditorTab} from "../../SettingsPanelProvider";

export default function ScaleEditor(): ReactJSXElement {

    const currentTab: ScaleEditorTab = useScaleEditorTab();

    return (
        <>
            {currentTab === ScaleEditorTab.VISUAL ?
                <VisualScaleEditor />
            :
                <ScalaFileEditor />
            }
        </>
    );
}
