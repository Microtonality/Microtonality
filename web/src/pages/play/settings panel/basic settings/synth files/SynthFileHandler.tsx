import SettingsFieldTitle from "../../elements/SettingsFieldTitle";
import UploadFileButton from "../../elements/UploadFileButton";
import Button from "../../../../../ui/Button";
import * as React from "react";
import {MCActions} from "../../../Reducers";
import {MicrotonalConfig} from "../../../../../utility/MicrotonalConfig";
import SynthFileSettings from "./SynthFileSettings";
import {useSetErrorMsg, useMCDispatch, useMConfig} from "../../../PlayProvider";
import {MConfigData} from "../../SettingsPanelContext";
import {useMConfigData, useSetMConfigData} from "../../SettingsPanelProvider";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import { v4 as UUIDv4 } from 'uuid';

export default function SynthFileHandler(): ReactJSXElement {

    const microtonalConfig: MicrotonalConfig = useMConfig();
    const mcDispatch = useMCDispatch();
    const errorMsgDispatch = useSetErrorMsg();

    const mConfigFileData: MConfigData = useMConfigData();
    const setMConfigFileData: Function = useSetMConfigData();

    const handleConfigUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();
        let readerResult: string | ArrayBuffer;
        let fileAsText: string = '';

        reader.onload = (): void => {
            readerResult = reader.result;
            if (readerResult instanceof ArrayBuffer)
                fileAsText = new TextDecoder().decode(readerResult);
            else
                fileAsText = readerResult;

            try {
                let config = JSON.parse(fileAsText);
                let configTitle: string = file.name.substring(0, file.name.length - 8); // Remove '.mConfig'

                // Create new configId to allow for multiple uploads of the same config.
                mcDispatch({type: MCActions.SET_CONFIG, config: {...config, title: configTitle, configId: UUIDv4()} as MicrotonalConfig});
                setMConfigFileData({title: config.title, description: config.description} as MConfigData);
            } catch (e) {
                errorMsgDispatch(MCONFIG_UPLOAD_ERROR(file.name));
            }
        }
        reader.onerror = (): void => {
            errorMsgDispatch(MCONFIG_UPLOAD_ERROR(file.name));
        }
        reader.readAsText(file);
    }

    const handleConfigDownload = (): void => {
        let config: MicrotonalConfig = {...microtonalConfig};
        if (mConfigFileData.title !== microtonalConfig.title || mConfigFileData.description !== microtonalConfig.description)
            config = {...microtonalConfig, title: mConfigFileData.title, description: mConfigFileData.description};

        let configJSON: string[] = [JSON.stringify(config)];
        let file: File = new File(configJSON, `${config.title}.mConfig`, {type: 'text'});

        // Create download link and click
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = file.name;
        element.click();
        element.remove();
    }

    return (
        <div className={'flex flex-col mb-4'}>

            <div className={'flex justify-between relative'}>
                <SettingsFieldTitle text={'SYNTH FILES'}/>
                <SynthFileSettings />
            </div>

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

const MCONFIG_UPLOAD_ERROR = (filename: string): string => {
    return `Your synth file '${filename}' could not be uploaded. Please try again.`;
};