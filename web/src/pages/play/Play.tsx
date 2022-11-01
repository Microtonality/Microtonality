import * as React from 'react';
import { Grid, Slider } from '@mui/material';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { useState } from 'react';

export default function Play() {
    function createMIDINote() {

    }

    function playSound() {

    }

    //Sets the value of the frequency bar slider
    const [freqBarValue, setFreqBarValue] = useState(12);
    const [freqComp, setFreqComp] = useState([])

    //Updates the value of the frequency bar as you slide it around
    const changeValue = (event: any, value: any) => {
        setFreqBarValue(value);
    };

    //Finalizes the value of the frequency bar when you release your mouse, 
    const changeValueCommitted = (event: any, value: any) => {
        setFreqBarValue(value);
        changeFreq();
    };

    //creates freq bar with the number of boxes = value
    function changeFreq() {
        console.log("Scale generated with " + freqBarValue + " notes")
        let freqBarArr = []
        for (let i = 0; i < freqBarValue; i++) {
            freqBarArr.push(<button className="freqBar">200</button>)
        }
        setFreqComp(freqBarArr)
    }

    //Sets the piano range from c3 -> b3, a single octave
    //Assigns keyboard shortcuts
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('b3');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
        <div className='play'>
            <div className='midi-input'>
                <h1>MIDI Input</h1>
                <button onClick={createMIDINote}>Create MIDI Note</button>
                {/* <button onClick={connectToInstrument}>Connect MIDI Instrument</button> */}
                <p>Note Played: </p>
            </div>
            <div className='audio'>
                <h1>MIDI Input</h1>
                <button onClick={playSound}>Play Sound</button>
            </div>

            <Grid id="freqBarGrid" container direction="row" justifyContent="center" alignItems="center">
                    {freqComp.map(item => item)}
            </Grid>

            <div id="piano">
                <Piano
                    noteRange={{ first: firstNote, last: lastNote }}
                    playNote={(midiNumber: any) => {}}
                    stopNote={(midiNumber: any) => {}}
                    width={1000}
                    keyboardShortcuts={keyboardShortcuts}
                />
            </div>

            <div id="controlPanel">
                <h1 style={{color: 'white'}}>Frequency Bar Adjustment</h1>
                <Slider
                    id="freqBarSlider"
                    aria-label="Small steps"
                    defaultValue={12}
                    step={1}
                    marks
                    min={12}
                    max={32}
                    valueLabelDisplay="auto"
                    value={freqBarValue}
                    onChange={changeValue}
                    onChangeCommitted={changeValueCommitted}
                />
            </div>
        </div>
        
    );
}