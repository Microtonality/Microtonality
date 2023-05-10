import * as React from "react";
import { useState } from "react";
import {MicrotonalConfig, ScaleConfig} from "../../utility/MicrotonalConfig";
import TuningFrequencyEditor from "./TuningFrequencyEditor";
import {MCActions} from "./Reducers";
import {generateEqualTemperedScale} from "../../utility/microtonal/ScaleGeneration";
import Button from "../../ui/Button";

interface BasicSettingsProps {
    microtonalConfig: MicrotonalConfig;
    mcDispatch: Function;
}

export default function BasicSettings(props: BasicSettingsProps) {

    const [rangeValue, setRangeValue] = useState<number>(12);
    const [hideRangeValue, setHideRangeValue] = useState<boolean>(false);

    const wrapSetRangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue(Number(event.target.value));
    }

    const handleRangeChange = () => {
        props.mcDispatch({type: MCActions.SET_SCALE, scale: generateEqualTemperedScale(rangeValue)});
    };

    const beginAdjustment = () => {
        setHideRangeValue(true)
    }

    const endAdjustment = () => {
        setHideRangeValue(false)
        handleRangeChange();
    }

    const handleConfigUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

            let config = JSON.parse(fileAsText);
            let configTitle: string = file.name.substring(0, file.name.length - 8); // Remove '.mConfig'
            props.mcDispatch({type: MCActions.SET_CONFIG, config: {...config, title: configTitle}});
        }
        reader.onerror = () => {
            console.error("BasicSettings.handleConfigUpload(): Could not read file");
        }
        reader.readAsText(file);
    }

    const handleConfigDownload = () => {
        let config: string[] = [JSON.stringify(props.microtonalConfig)];
        let file: File = new File(config, `${props.microtonalConfig.title}.mConfig`, {type: "text"});

        // Create download link, simulate click
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = file.name;

        document.body.appendChild(element); // Required for this to work in FireFox? TODO
        element.click();
        element.remove();
    }

    return(
        <div className="flex flex-col">

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[1%] mx-[7%]">
                UPLOAD SYNTH CONFIG
            </div>
            <div className="w-[85%] mx-[7%] mb-3">
                <input
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-agrandir text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                    type="file"
                    id="formFile"
                    accept=".mConfig"
                    onChange={(event) => handleConfigUpload(event)}/>
            </div>

            <div className="mx-[7%]">
                <Button className="w-[99%]" onClick={() => handleConfigDownload()} text={"DOWNLOAD SYNTH CONFIG"} disabled={false}/>
            </div>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    EQUAL-TEMPERED SCALE
            </div>

            <div className="mx-[7%] w-[85%] relative mt-[5%]">
                <input type="range" step={1} min={12} max={32} className="range h-3 w-full accent-neutral-200 cursor-pointer appearance-none rounded-lg border-neutral-500 border-[1px] bg-bgdark"
                    value={rangeValue}
                    onMouseDown={() => beginAdjustment()}
                    onMouseUp={() => endAdjustment()}
                    onChange={(e) => wrapSetRangeValue(e)}/>

                {hideRangeValue && (
                    <label
                        style={{ left: `${((rangeValue-12)/21) * 100}%` }}
                        className="absolute transform -translate-y-full top-0 text-center bg-gray-200 px-1 rounded text-sm font-agrandir pt-[1%]"
                        >
                        {rangeValue}
                    </label>
                )}
            </div>

            <TuningFrequencyEditor tuningFrequency={props.microtonalConfig.scaleConfig.tuningFrequency} mcDispatch={props.mcDispatch}/>
        </div>
    )

}