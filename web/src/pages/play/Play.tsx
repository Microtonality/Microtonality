import * as React from 'react';
import { Grid, Popper, Fade, Slider, Tooltip } from '@mui/material';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';

export default function Play() {
    function createMIDINote() {

    }

    function playSound() {

    }

    //Frequency bar values
    const [freqBarValue, setFreqBarValue] = useState(12); //number of frequencies
    const [freqComp, setFreqComp] = useState([]); //array of frequency buttons to be rendered
    const [activeFreq, setActiveFreq] = useState(new Map()); //map of frequencies, ex: 1->a
    const [activeFreqKeys, setActiveFreqKeys] = useState(new Map()); //inverse map of frequencies, ex: a->1

    //Records keypress for frequency assignment
    const readKey = () => new Promise(resolve => window.addEventListener('keydown', resolve, { once: true }));
    const homerow = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j']

    //Popper constants
    const [open, setOpen] = React.useState(false); //opens and closes popper
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); //sets position of popper under the clicked button
    const canBeOpen = open && Boolean(anchorEl); //boolean, if popper meets requirements to open, used in id
    const id = canBeOpen ? 'transition-popper' : undefined; //id for poppers

    //Assigns default frequencies on page load
    useEffect(() => {
        let defaultMap = activeFreq
        let defaultMapKeys = activeFreqKeys
        let defaultKeys = [[1, 'a'], [2, 'w'], [3, 's'], [4, 'e'], [5, 'd'], [6, 'f'], [7, 't'], [8, 'g'], [9, 'y'], [10, 'h'], [11, 'u'], [12, 'j']]
        for (let i = 0; i < 12; i++) {
            defaultMap.set(defaultKeys[i][0], defaultKeys[i][1])
            defaultMapKeys.set(defaultKeys[i][1], defaultKeys[i][0])
        }
        setActiveFreq(defaultMap)
        setActiveFreqKeys(defaultMapKeys)
        changeFreq()
    }, []);

    //Updates the value of the frequency bar as you slide it around
    const changeValue = (event: any, value: any) => {
        setFreqBarValue(value); 
    };

    //Finalizes the value of the frequency bar when you release your mouse, 
    const changeValueCommitted = (event: any, value: any) => {
        setFreqBarValue(value);
        changeFreq();
    };

    const activeButton = "btn h-13 w-13 font-agrandir text-md text-black bg-gold border-b-2 border-r-2 border-black uppercase"
    const inactiveButton = 'btn h-13 w-13 font-agrandir text-md text-black bg-white border-b-2 border-r-2 border-black hover:bg-gray-200'

    //creates freq bar with the number of boxes = value
    function changeFreq() {
        let freqBarArr = []
        for (let i = 0; i < freqBarValue; i++) {
            freqBarArr.push(
            <button 
                aria-describedby={id}
                key={i}
                className={`${activeFreq.has(i+1) ? activeButton : inactiveButton} + ${i == 0 ? 'rounded-l-md': ""} + ${i == (freqBarValue - 1) ? 'rounded-r-md' : ""}`} 
                onClick={(e) => assignFreq(e)}>
                    {i + 1}
                    {<br/>}
                    {activeFreq.get(i+1)}
            </button>)
        }
        setFreqComp(freqBarArr)
    }

    async function assignFreq(e: any) {
        setAnchorEl(e.currentTarget);

        //Unassigns a frequency if clicking on it after it's already assigned
        let tempVal = Number(e.target.innerText.split('\n')[0])
        if (activeFreq.has(tempVal)) {
            activeFreq.delete(tempVal)
            changeFreq();
            return;
        }

        //Opens popper
        setOpen(true);

        let tempArr, tempKeys = new Map();
        tempArr = activeFreq;
        tempKeys = activeFreqKeys;
        let pianoKey: any;
        
        //After clicking frequency, waits for key press to assign it
        //Loops until homerow key is mapped
        let containFlag = 0;
        while (containFlag == 0) {

            pianoKey = await readKey();

            //closes popper on escape key press
            if (pianoKey.key === "Escape") {
                setOpen(false);
                setAnchorEl(null)
                return
            }

            for (let i = 0; i < homerow.length; i++) {
                if (pianoKey.key == homerow[i]) {
                    containFlag = 1;
                    break;
                }
            }
        }

        //Closes popper after valid key press
        setOpen(false);
        setAnchorEl(null)

        //If key is already assigned to a frequency -> reassigns to new frequency if pressed again
        if (tempKeys.has(pianoKey.key)) {
            tempArr.delete(tempKeys.get(pianoKey.key))
            tempArr.set(tempVal, pianoKey.key)
            tempKeys.set(pianoKey.key, tempVal)
            setActiveFreq(tempArr)
            setActiveFreqKeys(tempKeys)
            changeFreq();
            return;
        }

        //Assigns key to frequency
        tempArr.set(tempVal, pianoKey.key)
        tempKeys.set(pianoKey.key, tempVal)
        setActiveFreq(tempArr)
        setActiveFreqKeys(tempKeys)
        console.log(activeFreq)
        changeFreq();
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
        <div>
            <div className="text-white">
                <h1>MIDI Input</h1>
                <button className="btn h-10 w-40 bg-white text-black rounded-md hover:bg-gray-100" onClick={createMIDINote}>Create MIDI Note</button>
                {/* <button onClick={connectToInstrument}>Connect MIDI Instrument</button> */}
                <p>Note Played: </p>
            </div>
            <div className="text-white">
                <h1>MIDI Input</h1>
                <button className="btn h-10 w-40 bg-white text-black rounded-md hover:bg-gray-100 mb-10" onClick={playSound}>Play Sound</button>
            </div>

            <Popper id={id} open={open} anchorEl={anchorEl} transition className="w-35 h-10 bg-white rounded-md font-agrandir text-black text-center">
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <p className="mt-2 mx-2">Assign key...</p>
                </Fade>
            )}
            </Popper>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                
                {freqComp.map(item => item)}
                <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
                    <button className="btn h-8 w-8 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
                </Tooltip>
            </Grid>

            <div className="container mx-auto my-auto mt-13 mb-13 h-450 w-1000 ">
                <Piano
                    className="mx-auto my-auto"
                    noteRange={{ first: firstNote, last: lastNote }}
                    playNote={(midiNumber: any) => {}}
                    stopNote={(midiNumber: any) => {}}
                    keyboardShortcuts={keyboardShortcuts}
                />
            </div>

            <div className="container mx-auto">
                <p className="text-xl font-agrandirwide text-white">NOTES PER OCTAVE</p>
                <Slider
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