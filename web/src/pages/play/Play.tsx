import * as React from 'react';
import { Grid, ListItem, Slider } from '@mui/material';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { useState, useEffect } from 'react';

export default function Play() {
    function createMIDINote() {

    }

    function playSound() {

    }

    const [freqBarValue, setFreqBarValue] = useState(12);
    const [freqComp, setFreqComp] = useState([]);

    //Map of numbers to keys: 1=>A
    const [activeFreq, setActiveFreq] = useState(new Map());

    //Map of keys to numbers: A=>1
    const [activeFreqKeys, setActiveFreqKeys] = useState(new Map());

    const readKey = () => new Promise(resolve => window.addEventListener('keypress', resolve, { once: true }));
    const homerow = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j']

    useEffect(() => {
        let defaultMap = activeFreq
        let defaultMapKeys = activeFreqKeys
        let defaultKeys = [[1, 'a'], [2, 'w'], [3, 's'], [4, 'e'], [5, 'd'], [6, 'f'], [7, 't'], [8, 'g'], [9, 'y'], [10, 'h'], [11, 'u'], [12, 'j']]
        for (let i = 0; i < 12; i++) {
            defaultMap.set(defaultKeys[i][0], defaultKeys[i][1])
            defaultMapKeys.set(defaultKeys[i][1], defaultKeys[i][0])
        }
        console.log(defaultMap)
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

    const activeButton = "btn h-12 w-12 text-md text-black bg-gold border-b-2 border-r-2 border-black uppercase"
    const inactiveButton = 'btn h-12 w-12 text-md text-black bg-white border-b-2 border-r-2 border-black hover:bg-gray-100'

    //creates freq bar with the number of boxes = value
    function changeFreq() {
        //console.log("Scale generated with " + freqBarValue + " notes")
        let freqBarArr = []
        for (let i = 0; i < freqBarValue; i++) {
            freqBarArr.push(
            <button 
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

        //Unassigns a frequency if clicking on it after it's already assigned
        let tempVal = Number(e.target.innerText.split('\n')[0])
        if (activeFreq.has(tempVal)) {
            activeFreq.delete(tempVal)
            changeFreq();
            return;
        }

        let tempArr, tempKeys = new Map();
        tempArr = activeFreq;
        tempKeys = activeFreqKeys;
        let pianoKey: any;

        //After clicking frequency, waits for key press to assign it
        pianoKey = await readKey();

        //Only allows piano shortcut keys to be assigned
        let containFlag = 0;
        for (let i = 0; i < homerow.length; i++) {
            if (pianoKey.key == homerow[i]) {
                containFlag = 1;
                break;
            }
        }
        if (containFlag == 0) return;

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

            <Grid container direction="row" justifyContent="center" alignItems="center">
                {freqComp.map(item => item)}
            </Grid>

            <div className="container mx-auto mt-10 mb-10">
                <Piano
                    className="mx-auto"
                    noteRange={{ first: firstNote, last: lastNote }}
                    playNote={(midiNumber: any) => {}}
                    stopNote={(midiNumber: any) => {}}
                    width={1000}
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