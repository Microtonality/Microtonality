import * as React from "react";
import {useState, useEffect} from 'react';

export default function InstrumentPresets() {
    const [preset, setPreset] = useState("Custom")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreset(e.target.value)
    }

    useEffect(() => {
        console.log(preset)
    }, [preset])

    return(
            <div className="flex flex-col font-agrandir text-white mt-1 ml-1 text-md" onChange={onChange}>
                <span><input type="radio" value="Custom"        name="instrument" checked={preset === 'Custom'} /> Custom</span>
                <span><input type="radio" value="Flute"         name="instrument" checked={preset === 'Flute'}/> Flute</span>
                <span><input type="radio" value="Oboe"          name="instrument" checked={preset === 'Oboe'}/> Oboe</span>
                <span><input type="radio" value="Clarinet"      name="instrument" checked={preset === 'Clarinet'}/> Clarinet</span>
                <span><input type="radio" value="Bassoon"       name="instrument" checked={preset === 'Bassoon'}/> Bassoon</span>
                <span><input type="radio" value="Trumpet"       name="instrument" checked={preset === 'Trumpet'}/> Trumpet</span>
                <span><input type="radio" value="French Horn"   name="instrument" checked={preset === 'French Horn'}/> French Horn</span>
                <span><input type="radio" value="Trombone"      name="instrument" checked={preset === 'Trombone'}/> Trombone</span>
                <span><input type="radio" value="Tuba"          name="instrument" checked={preset === 'Tuba'}/> Tuba</span>
            </div>
    )
}