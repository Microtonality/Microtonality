import SettingsFieldTitle from "../SettingsFieldTitle";
import UploadFileButton from "../UploadFileButton";
import Button from "../../../../ui/Button";
import * as React from "react";
import {Scale} from "../../../../utility/microtonal/Scale";
import {parseScalaFile} from "../../../../utility/microtonal/scala/ScalaParser";
import {MCActions} from "../../Reducers";
import {generateScalaFile} from "../../../../utility/microtonal/scala/ScalaGenerator";

interface ScalaFileHandlerProps {
    scale: Scale;
    mcDispatch: Function;
    displayErrorMsg: (msg: string) => void;
}

export default function ScalaFileHandler(props: ScalaFileHandlerProps) {

    // Set the current scale from an uploaded '.scl' file.
    const handleScalaFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();
        let readerResult: string | ArrayBuffer;
        let fileAsText: string = "";

        reader.onload = () => {
            readerResult = reader.result
            if (readerResult instanceof ArrayBuffer)
                fileAsText = new TextDecoder().decode(readerResult);
            else
                fileAsText = readerResult;

            let scale: Scale = null;
            try {
                scale = parseScalaFile(fileAsText);
            } catch (e) {
                props.displayErrorMsg(e.message);
                return;
            }

            if (scale !== null)
                props.mcDispatch({type: MCActions.SET_SCALE, scale: scale});
        }
        reader.onerror = () => {
            props.displayErrorMsg(SCALA_FILE_UPLOAD_ERROR(file.name));
        }
        reader.readAsText(file);
    }

    // Generate a .scl file from the current scale
    // and download it to the user's computer.
    const handleScalaFileDownload = () => {

        let file: File = null;
        try {
            file = generateScalaFile(props.scale);
        } catch(e) {
            props.displayErrorMsg(e.message);
            return;
        }

        // Create download link, simulate click
        const element = document.createElement('a');
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
                uploadFile={(e) => handleScalaFileUpload(e)}
            />

            <Button
                text={'DOWNLOAD SCALA'}
                onClick={() => handleScalaFileDownload()}
            />
        </div>
    );
}

const SCALA_FILE_UPLOAD_ERROR = (fileName: string): string => {
    return `Your scala file '${fileName}' could not be uploaded. Please try again.`;
}