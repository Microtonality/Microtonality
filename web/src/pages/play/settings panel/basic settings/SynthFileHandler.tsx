import SettingsFieldTitle from "../SettingsFieldTitle";
import UploadFileButton from "../UploadFileButton";
import Button from "../../../../ui/Button";
import * as React from "react";
import {MCActions} from "../../Reducers";
import {MicrotonalConfig} from "../../../../utility/MicrotonalConfig";

interface SynthFileHandlerProps {
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
    displayErrorMsg: (msg: string) => void;
}

export default function SynthFileHandler(props: SynthFileHandlerProps) {

    const handleConfigUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();
        let readerResult: string | ArrayBuffer;
        let fileAsText: string = "";

        reader.onload = () => {
            readerResult = reader.result;
            if (readerResult instanceof ArrayBuffer)
                fileAsText = new TextDecoder().decode(readerResult);
            else
                fileAsText = readerResult;

            let config = JSON.parse(fileAsText);
            let configTitle: string = file.name.substring(0, file.name.length - 8); // Remove '.mConfig'

            try {
                props.mcDispatch({type: MCActions.SET_CONFIG, config: {...config, title: configTitle}});
            } catch (e) {
                props.displayErrorMsg(MCONFIG_UPLOAD_ERROR(file.name));
            }
        }
        reader.onerror = () => {
            props.displayErrorMsg(MCONFIG_UPLOAD_ERROR(file.name));
        }
        reader.readAsText(file);
    }

    const handleConfigDownload = () => {
        let config: string[] = [JSON.stringify(props.microtonalConfig)];
        let file: File = new File(config, `${props.microtonalConfig.title}.mConfig`, {type: 'text'});

        // Create download link, simulate click
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = file.name;

        element.click();
        element.remove();
    }

    return (
        <div className={'flex flex-col mb-4'}>
            <SettingsFieldTitle text={'SYNTH FILES'} />

            <UploadFileButton
                text={'UPLOAD SYNTH FILE'}
                accept={'.mConfig'}
                uploadFile={(e) => handleConfigUpload(e)}
            />

            <Button
                text={'DOWNLOAD SYNTH'}
                onClick={() => handleConfigDownload()}
            />
        </div>
    );
}

const MCONFIG_UPLOAD_ERROR = (fileName: string): string => {
    return `Your synth file '${fileName}' could not be uploaded. Please try again.`;
}