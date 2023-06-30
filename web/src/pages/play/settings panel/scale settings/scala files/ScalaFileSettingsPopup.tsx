import * as React from "react";
import {MutableRefObject} from "react";
import useHandleClickOutsideRef from "../../../../../ui/HandleClickOutside";
import CloseButton from "../../elements/CloseButton";
import FilenameEditor from "../../elements/FilenameEditor";
import DescriptionEditor from "../../elements/DescriptionEditor";
import {ScalaData} from "../../SettingsPanelContext";
import {useScalaData, useSetScalaData} from "../../SettingsPanelProvider";
import Animator from "../../elements/animations/Animator";
import {EnterLeftExitLeft} from "../../elements/animations/Animations";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface ScalaFileSettingsPopupProps {
    visible: boolean;
    setVisible: (val: boolean) => void;
}

export default function ScalaFileSettingsPopup(props: ScalaFileSettingsPopupProps): ReactJSXElement {

    const scalaData: ScalaData = useScalaData();
    const setScalaData: Function = useSetScalaData();

    const clickOutsideRef: MutableRefObject<HTMLDivElement> = useHandleClickOutsideRef(props.setVisible, false);

    const setScalaFilename = (name: string): void => {
        setScalaData({...scalaData, title: name});
    }

    const setScalaDescription = (desc: string): void => {
        setScalaData({...scalaData, description: desc});
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
                title={'Scale Name'}
                filename={scalaData.title}
                setFilename={setScalaFilename}
            />

            <DescriptionEditor
                className={'mt-1'}
                title={'Scale Description'}
                description={scalaData.description}
                setDescription={setScalaDescription}
            />

            <CloseButton
                className={'-top-1.5 -right-1.5'}
                onClick={closePopup}
            />
        </Animator>
    );
}