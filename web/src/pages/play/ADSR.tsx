import {Grid, Slider} from "@mui/material";
import * as React from "react";

interface ADSRProps {
}

export default function ADSR(props: ADSRProps) {
    const [openTab, setOpenTab] = React.useState(1);

    return <div className="max-w-[50%] bottom-0 border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight w-96">
        <div className="w-full">
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
                        href="#rightlink1"
                        role="tablist"
                    >
                        ADSR
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
                        href="#rightlink2"
                        role="tablist"
                    >
                        SYNTHESIZERS
                    </a>
                </li>
            </ul>

            <div className="container max-w-2xl bg-bglight mr-auto">
                <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">

                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <div className='container h-150'>
                                <Slider
                                    //Does not display right.
                                    //Container issue?

                                    sx={{
                                        '& input[type="range"]': {
                                            WebkitAppearance: 'slider-vertical',
                                        },
                                        color: 'white'
                                    }}
                                    orientation="vertical"
                                    defaultValue={0}
                                    aria-label="Slider2"
                                    valueLabelDisplay="auto"
                                    //onKeyDown={preventHorizontalKeyboardNavigation}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}