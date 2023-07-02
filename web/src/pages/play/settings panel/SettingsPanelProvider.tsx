import * as React from "react";
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {
    MConfigData,
    MConfigDataContext,
    MConfigDataDispatchContext,
    ScalaData,
    ScalaDataContext,
    ScalaDataDispatchContext,
    ScaleEditorTab,
    ScaleEditorTabContext,
    ScaleEditorTabDispatchContext
} from "./SettingsPanelContext";
import {useMConfig} from "../PlayProvider";
import {Scale} from "../../../utility/microtonal/Scale";
import {MicrotonalConfig} from "../../../utility/MicrotonalConfig";

interface SettingsPanelProviderProps {
    children: ReactJSXElement | ReactJSXElement[];
}

// This is mainly used to update the title and description
// of both the config and scala files without updating the config history.
export default function SettingsPanelProvider(props: SettingsPanelProviderProps): ReactJSXElement {

    const microtonalConfig: MicrotonalConfig = useMConfig();
    const initMConfigData = (): MConfigData => {
        return {title: microtonalConfig.title, description: microtonalConfig.description} as MConfigData;
    }
    const [mConfigData, setMConfigData] = useState<MConfigData>(initMConfigData());

    const scale: Scale = microtonalConfig.scaleConfig.scale;
    const initScalaData = (): ScalaData => {
        return {title: scale.title, description: scale.description} as ScalaData;
    }
    const [scalaData, setScalaData] = useState<ScalaData>(initScalaData());

    const [scaleEditorTab, setScaleEditorTab] = useState<ScaleEditorTab>(ScaleEditorTab.VISUAL);

    useEffect((): void => {
        if (microtonalConfig.title && microtonalConfig.description) {
            if (microtonalConfig.title !== mConfigData.title &&
                microtonalConfig.description !== mConfigData.description)
                setMConfigData(initMConfigData());
        }
    }, [microtonalConfig.configId]);

    useEffect((): void => {
        if (scale.title && scale.description) {
            if (scale.title !== scalaData.title &&
                scale.description !== scalaData.description)
                setScalaData(initScalaData());
        }
    }, [scale.title, scale.description]);

    return (
        <MConfigDataContext.Provider value={mConfigData}>
        <MConfigDataDispatchContext.Provider value={setMConfigData}>
            <ScalaDataContext.Provider value={scalaData}>
            <ScalaDataDispatchContext.Provider value={setScalaData}>
                <ScaleEditorTabContext.Provider value={scaleEditorTab}>
                <ScaleEditorTabDispatchContext.Provider value={setScaleEditorTab}>
                    {props.children}
                </ScaleEditorTabDispatchContext.Provider>
                </ScaleEditorTabContext.Provider>
            </ScalaDataDispatchContext.Provider>
            </ScalaDataContext.Provider>
        </MConfigDataDispatchContext.Provider>
        </MConfigDataContext.Provider>
    );
}

export function useMConfigData(): MConfigData { return useContext(MConfigDataContext); }
export function useSetMConfigData(): Function { return useContext(MConfigDataDispatchContext); }

export function useScalaData(): ScalaData { return useContext(ScalaDataContext); }
export function useSetScalaData(): Function { return useContext(ScalaDataDispatchContext); }

export function useScaleEditorTab(): ScaleEditorTab { return useContext(ScaleEditorTabContext); }
export function useSetScaleEditorTab(): Dispatch<SetStateAction<ScaleEditorTab>> { return useContext(ScaleEditorTabDispatchContext); }


export enum SettingsPanelTabs {
    BASIC,
    SCALE
}
