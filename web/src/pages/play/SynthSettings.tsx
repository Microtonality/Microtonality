import {FormControl, Grid, Slider} from "@mui/material";
import * as React from "react";
import Oscillator from "../../ui/Oscillator";
import Knobs from "../../ui/Knobs";

interface SynthProps {
}

export default function SynthSettings(props: SynthProps) {

    return <div className="h-full w-full bottom-0 border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight">
        <div className="mt-[1%] flex flex-col h-1/2">
            <div className="flex flex-row w-1/5">
                <Knobs onChange={(value) => console.log(value)} />
                <Knobs onChange={(value) => console.log(value)} />
            </div>
            <div className="mt-[1%] flex flex-row w-1/5">
                <Knobs onChange={(value) => console.log(value)} />
                <Knobs onChange={(value) => console.log(value)} />
            </div>
        </div>
    </div>;
}