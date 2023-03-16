import {Button, FormControl, Grid, MenuItem, Select, Slider, TextField} from "@mui/material";
import SynthSettings from "./SynthSettings";
import * as React from "react";
import {ChangeEventHandler, KeyboardEventHandler} from "react";
import {MicrotonalConfig, ScaleConfig} from "../../utility/MicrotonalConfig";
import ScaleEditor from "./ScaleEditor";
import BasicSettings from "./BasicSettings";

interface ScaleSettingsProps {
    className?: string
    microtonalConfig: MicrotonalConfig
    mcDispatch: Function
}

export default function ScaleSettings(props: ScaleSettingsProps) {
    const [openTab, setOpenTab] = React.useState(1);

    return <div className="h-full border-gold border-t-2 border-r-2 rounded-tr-xl bg-bglight">
        <div className="w-full flex flex-col h-full">
            <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row border-b-2 border-gold"
                role="tablist"
            >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                        className={
                            "2xl:text-xl xl:text-lg md:text-sm sm:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal hover:underline " +
                            (openTab === 1 ? "text-gold underline" : "text-white")}
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(1)
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                    >
                        BASIC SETTINGS
                    </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                        className={
                            "2xl:text-xl xl:text-lg md:text-sm sm:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal hover:underline " +
                            (openTab === 2 ? "text-gold underline" : "text-white")}
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(2)
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                    >
                        SCALE EDITOR
                    </a>
                </li>
            </ul>

            <div className="container max-w-2xl bg-bglight mr-auto overflow-auto">
                <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <BasicSettings microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch}/>
                        </div>

                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <ScaleEditor microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}