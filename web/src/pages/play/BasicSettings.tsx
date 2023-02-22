import {Button, FormControl, Grid, MenuItem, Select, Slider, TextField} from "@mui/material";
import SynthSettings from "./SynthSettings";
import * as React from "react";
import {ChangeEventHandler, KeyboardEventHandler} from "react";
import {ScaleConfig} from "../../utility/MicrotonalConfig";

interface BasicSettingsProps {
    className?: string,
    scaleConfig: ScaleConfig
}


export default function BasicSettings(props: BasicSettingsProps) {
    const [openTab, setOpenTab] = React.useState(1);


    return <div className="max-w-[50%] border-gold border-t-2 border-r-2 rounded-tr-xl bg-bglight w-96">
        <div className="w-full overflow-auto flex flex-col h-full">
            <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row border-b-2 border-gold"
                role="tablist"
            >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                        className={
                            "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal hover:underline " +
                            (openTab === 1 ? "text-gold underline" : "text-white")}
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(1)
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                    >
                        SETTINGS
                    </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                        className={
                            "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal hover:underline " +
                            (openTab === 2 ? "text-gold underline" : "text-white")}
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(2)
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                    >
                        SCALA
                    </a>
                </li>
            </ul>

            <div className="container max-w-2xl bg-bglight mr-auto overflow-auto">
                <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <div
                                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white">NOTES
                                PER OCTAVE
                            </div>
                            <FormControl fullWidth className="max-w-md font-agrandir-wide">
                                <Slider
                                    className="ml-1"
                                    aria-label="Small steps"
                                    defaultValue={12}
                                    step={1}
                                    marks
                                    min={12}
                                    max={32}
                                    valueLabelDisplay="auto"
                                    value={props.scaleConfig.scale.notes.length}
                                    // onChange={props.changeSliderValue}
                                    // onChangeCommitted={props.changeSliderValueCommitted}
                                    sx={{color: 'white'}}
                                />
                            </FormControl>
                            <div
                                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-2">MIDI
                                DEVICE
                            </div>
                            <FormControl fullWidth className="max-w-md font-agrandir-wide"
                                         sx={{color: 'white', fontFamily: 'Agrandir-Wide'}}>
                                <Select value={0}
                                        sx={{background: 'white', marginTop: '5px', fontFamily: 'Agrandir-Wide'}}>
                                    <MenuItem value={0} sx={{fontFamily: 'Agrandir-Wide'}}>MIDI KEYBOARD</MenuItem>
                                </Select>
                            </FormControl>

                            <div
                                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-3">BASE
                                FREQUENCY
                            </div>
                            <TextField fullWidth className="max-w-md"
                                       sx={{
                                           marginTop: '5px',
                                           background: 'white',
                                           borderRadius: '4px',
                                           input: {color: 'black', fontFamily: 'Agrandir-Wide'}
                                       }}
                                       type='number'
                                       inputProps={{step: '0.0001'}}
                                       value={props.scaleConfig.tuningFrequency}
                                       // onChange={props.changeBaseFreq}
                                       // onKeyDown={props.changeBaseFreqCommitted}
                            />
                        </div>


                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <Button
                                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs"
                                sx={{
                                    background: 'white',
                                    fontFamily: 'Agrandir-Wide',
                                    color: 'black',
                                    border: 1,
                                    '&:hover': {background: '#FFD059'}
                                }}
                                variant="contained"
                                component="label"
                            >
                                IMPORT SCALA
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                            <Button
                                sx={{
                                    background: 'white',
                                    fontFamily: 'Agrandir-Wide',
                                    color: 'black',
                                    border: 1,
                                    '&:hover': {background: '#FFD059'}
                                }}
                                variant="contained"
                                component="label"
                            >
                                EXPORT SCALA
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}