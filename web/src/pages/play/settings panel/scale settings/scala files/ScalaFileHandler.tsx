import SettingsFieldTitle from "../../elements/SettingsFieldTitle";
import UploadFileButton from "../../elements/UploadFileButton";
import Button from "../../../../../ui/Button";
import * as React from "react";
import {Scale} from "../../../../../utility/microtonal/Scale";
import {parseScalaFile} from "../../../../../utility/microtonal/scala/ScalaParser";
import {MCActions} from "../../../Reducers";
import {generateScalaFile} from "../../../../../utility/microtonal/scala/ScalaGenerator";
import {useSetErrorMsg, useMCDispatch, useScale} from "../../../PlayProvider";
import {useScalaData, useSetScalaData} from "../../SettingsPanelProvider";
import {ScalaData} from "../../SettingsPanelContext";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function ScalaFileHandler(): ReactJSXElement {

    const scale: Scale = useScale();
    const mcDispatch: Function = useMCDispatch();
    const errorMsgDispatch: Function = useSetErrorMsg();

    const scalaData: ScalaData = useScalaData();
    const scalaTitle: string = scalaData.title;
    const scalaDescription: string = scalaData.description;
    const setScalaData: Function = useSetScalaData();

    const handleScalaUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {

        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();
        let readerResult: string | ArrayBuffer;
        let fileAsText: string = "";

        reader.onload = (): void => {
            readerResult = reader.result
            if (readerResult instanceof ArrayBuffer)
                fileAsText = new TextDecoder().decode(readerResult);
            else
                fileAsText = readerResult;

            try {
                let newScale: Scale = parseScalaFile(fileAsText);
                mcDispatch({type: MCActions.SET_SCALE, scale: newScale});
                setScalaData({title: newScale.title, description: newScale.description} as ScalaData);
            } catch (e) {
                errorMsgDispatch(e.message);
            }
        }
        reader.onerror = (): void => {
            errorMsgDispatch(SCALA_FILE_UPLOAD_ERROR(file.name));
        }
        reader.readAsText(file);
    }

    const handleScalaDownload = (): void => {
        let curScale: Scale = scale;
        if (scalaTitle !== curScale.title || scalaDescription !== curScale.description)
            curScale = {...scale, title: scalaTitle, description: scalaDescription};

        let file: File = null;
        try {
            file = generateScalaFile(curScale);
        } catch(e) {
            errorMsgDispatch(e.message);
            return;
        }

        // Create download link and simulate click.
        const element: HTMLAnchorElement = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = file.name;
        element.click();
        element.remove();
    }

    return (
        <div className={'flex flex-col mb-4'}>

            <SettingsFieldTitle text={'SCALA FILES'} />

            <UploadFileButton
                text={'UPLOAD SCALA FILE'}
                accept={'.scl'}
                uploadFile={(e) => handleScalaUpload(e)}
            />

            <Button
                text={'DOWNLOAD SCALA'}
                onClick={() => handleScalaDownload()}
            />
        </div>
    );
}

const SCALA_FILE_UPLOAD_ERROR = (fileName: string): string => {
    return `Your scala file '${fileName}' could not be uploaded. Please try again.`;
}