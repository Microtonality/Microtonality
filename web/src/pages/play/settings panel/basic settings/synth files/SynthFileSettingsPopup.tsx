import * as React from "react";
import {MutableRefObject} from "react";
import useHandleClickOutsideRef from "../../../../../ui/HandleClickOutside";
import CloseButton from "../../elements/CloseButton";
import FilenameEditor from "../../elements/FilenameEditor";
import DescriptionEditor from "../../elements/DescriptionEditor";
import {MConfigData} from "../../SettingsPanelContext";
import {useMConfigData, useSetMConfigData} from "../../SettingsPanelProvider";
import Animator from "../../elements/animations/Animator";
import {EnterLeftExitLeft} from "../../elements/animations/Animations";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface SynthFileSettingsPopupProps {
    visible: boolean;
    setVisible: (val: boolean) => void;
}

export default function SynthFileSettingsPopup(props: SynthFileSettingsPopupProps): ReactJSXElement {

    const mConfigFileData: MConfigData = useMConfigData();
    const setMConfigFileData: Function = useSetMConfigData();

    const clickOutsideRef: MutableRefObject<HTMLDivElement> = useHandleClickOutsideRef(props.setVisible, false);

    const setMConfigFilename = (name: string): void => {
        setMConfigFileData({...mConfigFileData, title: name});
    }

    const setMConfigDescription = (desc: string): void => {
        setMConfigFileData({...mConfigFileData, description: desc});
    }

    const closePopup = (): void => {
        props.setVisible(false);
    }

    return (
        <Animator
            className={'absolute w-full p-1 bg-neutral-700 border-2 border-black rounded'}
            clickOutsideRef={clickOutsideRef}
            animation={EnterLeftExitLeft}
            visible={props.visible}
        >
            <FilenameEditor
                title={'Synth Name'}
                filename={mConfigFileData.title}
                setFilename={setMConfigFilename}
            />

            <DescriptionEditor
                className={'mt-1'}
                title={'Synth Description'}
                description={mConfigFileData.description}
                setDescription={setMConfigDescription}
            />

            <CloseButton
                className={'-top-1.5 -right-1.5'}
                onClick={closePopup}
            />
        </Animator>
    );
}