import * as React from "react";
import {FormControl, Grid, Slider} from "@mui/material";

export default function Oscillator() {
    return (
        <div className='silent'>
            <Slider
                sx={{
                '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                },
                    color: 'white'
            }}
                id="pitch_ratio"
                orientation="vertical"
                defaultValue={0}
                aria-label="Slider2"
                valueLabelDisplay="auto"
            />
        </div>
    )
}