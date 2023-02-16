import * as React from "react";
import { Component } from "react";
import { Grid, Popper, Fade, Slider, Tooltip, FormControl, InputLabel, Select, MenuItem, Box, Tabs, Tab, Button, Menu, TextField, } from '@mui/material';
import './oscillator.css';

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
