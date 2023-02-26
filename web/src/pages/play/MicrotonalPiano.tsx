import {useState} from "react";
import FrequencyBarComponent from "./FrequencyBar";
import * as React from "react";
import OctaveButtons from "./OctaveButtons";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import { Piano, KeyboardShortcuts } from 'react-piano';
import {NoteToMIDI} from "../../utility/midi/NoteToMIDI";
import { Grid } from "@mui/material";

function createDefaultKeyMapping(keys: number) {
    return {}
}

function playNote() {

}

function stopNote() {

}

export default function MicrotonalPiano(props: {
    scaleConfig: ScaleConfig,
    keyMapping: Record<string, number>,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);
    return <div>
        <FrequencyBarComponent keyMapping={{0: 0, 1: 1, 2: 2}} notesPerOctave={12} playMidiNote={() => {}}
                               setKeyMapping={props.setKeyMapping} octaveOffset={octave}/>
        <Grid container direction="row" justifyContent="center" className="mt-13">
            <OctaveButtons octaveUp={() => setOctave(octave + 1)} octaveDown={() => setOctave(octave - 1)}/>
            <div>
                <Piano
                    className="mx-auto my-auto"
                    playNote={playNote}
                    stopNote={stopNote}
                    noteRange={{ first: NoteToMIDI('c' + octave), last: NoteToMIDI('b' + octave) }}
                />
            </div>
        </Grid>
    </div>;
}