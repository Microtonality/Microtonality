import * as React from "react";
import {useEffect, useState} from "react";
import {ScalaData} from "../../SettingsPanelContext";
import {useScalaData, useSetScalaData} from "../../SettingsPanelProvider";
import {useMCDispatch, useScale, useSetErrorMsg} from "../../../PlayProvider";
import {Scale, scaleAbstractEquals} from "../../../../../utility/microtonal/Scale";
import {generateScalaText} from "../../../../../utility/microtonal/scala/ScalaGenerator";
import SettingsFieldTitle from "../../elements/SettingsFieldTitle";
import ScaleEditorTabSwitcher from "./ScaleEditorTabSwitcher";
import {parseScalaFile} from "../../../../../utility/microtonal/scala/ScalaParser";
import {MCActions} from "../../../Reducers";
import {SVGButtonPaths, SVGButtons} from "../../elements/SVGButton";
import {FadeInAndOut, GrowY} from "../../elements/animations/Animations";
import Animator from "../../elements/animations/Animator";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import SaveButton from "../../elements/SaveButton";
import {isFirefox} from "react-device-detect";

export default function ScalaFileEditor(): ReactJSXElement {

    const scale: Scale = useScale();
    const mcDispatch: Function = useMCDispatch();
    const setErrorMsg: Function = useSetErrorMsg();

    const scalaData: ScalaData = useScalaData();
    const setScalaData: Function = useSetScalaData();

    const getScala = (): string[] => {
        let curScale: Scale = scale;
        if (curScale.title !== scalaData.title || curScale.description !== scalaData.description)
            curScale = {...curScale, title: scalaData.title, description: scalaData.description} as Scale;

        return generateScalaText(curScale);
    }

    const originalScala: string[] = getScala();
    const [tempScalaFile, setTempScalaFile] = useState<string[]>(originalScala);

    const textareaClassName: string = `settings-panel-input resize-none ${(isFirefox) ? 'whitespace-pre overflow-x-scroll' : 'whitespace-nowrap overflow-x-auto'}`;
    const textareaRows: number = tempScalaFile.length;
    const textareaCols: number = window.innerWidth;

    useEffect(() => {
        setTempScalaFile(getScala());
    }, [scale, scalaData]);

    const wrapSetTempScalaFile = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {

        let scalaString: string = event.target.value;
        let scalaStringList: string[] = scalaString.split('\n');

        scalaStringList = scalaStringList.map((line: string, i: number): string => {
            if (i === scalaStringList.length - 1)
                return line;
            return line + '\n';
        });

        setTempScalaFile(scalaStringList);
    }

    const submitScalaFile = (): void => {
        let newScale: Scale;
        try {
            newScale = parseScalaFile(tempScalaFile.join(''));
        } catch (e) {
            setErrorMsg(e.message);
            return;
        }

        if (scaleAbstractEquals(newScale, scale)) {
            setTempScalaFile(originalScala);
            return;
        }

        setScalaData({...scalaData, title: newScale.title, description: newScale.description});
        mcDispatch({type: MCActions.SET_SCALE, scale: newScale});
    }

    const sendUserToScalaFileHelpPage = (): void => {
        // Create link and simulate click.
        const element: HTMLAnchorElement = document.createElement('a');
        element.href = 'https://huygens-fokker.org/scala/scl_format.html';
        element.target = '_blank';
        element.click();
        element.remove();
    }

    const handleScalaFileHelpKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            sendUserToScalaFileHelpPage();
            event.preventDefault();
        }
    }

    return (
        <div className={'flex flex-col'}>

            <div className={'flex justify-between'}>
                <Animator
                    className={'flex flex-row'}
                    animation={FadeInAndOut}
                >
                    <SettingsFieldTitle
                        className={'mb-1'}
                        text={'SCALA EDITOR'}
                    />
                </Animator>

                <div className={'flex flex-row'}>
                    <SaveButton
                        original={originalScala.join('')}
                        current={tempScalaFile.join('')}
                        onClick={submitScalaFile}
                    />

                    <ScaleEditorTabSwitcher />
                </div>
            </div>

            <Animator
                className={'relative'}
                animation={GrowY}
            >

                <textarea
                    className={textareaClassName}
                    rows={textareaRows}
                    cols={textareaCols}
                    value={tempScalaFile.join('')}
                    onChange={(e) => wrapSetTempScalaFile(e)}
                />

                {/* Pretty much an SVGButton. */}
                <div
                    className={'absolute top-1 right-1 h-min group cursor-pointer bg-neutral-200 dark:bg-bgdark outline-0'}
                    tabIndex={0}
                    onClick={() => sendUserToScalaFileHelpPage()}
                    onKeyDown={(e) => handleScalaFileHelpKeyDown(e)}
                    onMouseLeave={(e) => e.currentTarget.blur()}
                >
                    <svg
                        className={'w-6 h-6 fill-none stroke-2 stroke-neutral-400 dark:stroke-black group-hocus:stroke-black dark:group-hocus:stroke-gold'}
                        xmlns={'http://www.w3.org/2000/svg'}
                        strokeLinecap={'round'}
                        strokeLinejoin={'round'}
                    >
                        {SVGButtonPaths(SVGButtons.questionMarkCircle)}
                    </svg>
                </div>

            </Animator>

        </div>
    );
}