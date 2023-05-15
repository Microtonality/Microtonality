import * as React from "react";
import {MicrotonalConfig} from "../../utility/MicrotonalConfig";
import ScaleEditor from "./scale editor/ScaleEditor";
import BasicSettings from "./BasicSettings";
import {useState} from "react";
import ErrorPopUp, {HIDE_ERROR} from "../../ui/ErrorPopUp";

interface ScaleSettingsProps {
    className?: string,
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function ScaleSettings(props: ScaleSettingsProps) {
    const [openTab, setOpenTab] = useState(1);
    const [errorMsg, displayErrorMsg] = useState<string>(HIDE_ERROR);

    return <div className="h-full w-full border-gold border-t-2 border-r-2 rounded-tr-xl bg-bglight">

        <ErrorPopUp errorMsg={errorMsg}/>

        <div className="w-full flex flex-col h-full">
            <ul
                className="flex justify-around mb-0 list-none flex-wrap p-3 flex-row border-b-2 border-gold"
                role="tablist"
            >
                <li className="mr-2 last:mr-0 flex-auto text-center">
                    <div
                        className={
                            "xl:text-lg text-xs font-agrandir-wide uppercase px-2 py-2 rounded block leading-normal hover:underline " +
                            (openTab === 1 ? "text-gold underline" : "text-white cursor-pointer")}
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(1)
                        }}
                        data-toggle="tab"
                        role="tablist"
                    >
                        BASIC SETTINGS
                    </div>
                </li>
                <li className="mr-2 last:mr-0 flex-auto text-center">
                    <div
                        className={
                            "xl:text-lg text-xs font-agrandir-wide uppercase px-2 py-2 rounded block leading-normal hover:underline " +
                            (openTab === 2 ? "text-gold underline" : "text-white cursor-pointer ")}
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(2)
                        }}
                        data-toggle="tab"
                        role="tablist"
                    >
                        SCALE EDITOR
                    </div>
                </li>
            </ul>

            <div className="h-full w-full flex bg-bglight mr-auto overflow-auto">
                <div className="px-4 py-5 flex-auto h-full">
                    <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <BasicSettings microtonalConfig={props.microtonalConfig}
                                           mcDispatch={props.mcDispatch}
                                           displayErrorMsg={displayErrorMsg}/>
                        </div>

                        <div className={(openTab === 2 ? "block" : "hidden") + ""} id="link2">
                            <ScaleEditor scale={props.microtonalConfig.scaleConfig.scale}
                                         tuningFrequency={props.microtonalConfig.scaleConfig.tuningFrequency}
                                         mcDispatch={props.mcDispatch}
                                         displayErrorMsg={displayErrorMsg}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}