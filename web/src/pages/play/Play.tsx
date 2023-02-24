import * as React from 'react';
import { Grid, Popper, Fade, Slider, Tooltip, FormControl, InputLabel, Select, MenuItem, Box, Tabs, Tab, Button, Menu, TextField, } from '@mui/material';
import { Piano, KeyboardShortcuts } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';
import { Synthesizer } from './Synthesizer';
import { NoteToMidi, NotesFromOctave } from '../../utility/midi/NoteToMidiConverter';
import FrequencyBar from './FrequencyBar';
import Oscillator from "./Oscillator";
import Knobs from "./Knobs";

// TODO: When a user is holding down a note and changes the octave,
// the note remains downpressed on the original octave.
// You then need to press the note twice to play it.
const frequencyBar = new FrequencyBar();
const synthesizer = new Synthesizer(frequencyBar);

declare global {
    namespace React {
      interface DOMAttributes<T> {
        onResize?: ReactEventHandler<T> | undefined;
        onResizeCapture?: ReactEventHandler<T> | undefined;
        nonce?: string | undefined;
      }
    }
  }

export default function Play() {

    const [openTab, setOpenTab] = React.useState(1);
    const [openRightTab, setOpenRightTab] = React.useState(1);

    function octaveUp(): void {
        synthesizer.OctaveUp();
        updateOnScreenKeyboard();
        frequencyBar.updateCurrentOctave(synthesizer.audioConfiguration.currentOctave);
        createFrequencyBar();
    }

    function octaveDown(): void {
        synthesizer.OctaveDown();
        updateOnScreenKeyboard();
        frequencyBar.updateCurrentOctave(synthesizer.audioConfiguration.currentOctave);
        createFrequencyBar();
    }

    function createMIDINote() {
    }

    function playSound() {
    }

    //Frequency bar values
    const [freqBarValue, setFreqBarValue] = useState(12); //number of frequencies
    const [freqBar, setFreqBar] = useState([]); //array of frequency buttons to be rendered
    const [baseFreq, setBaseFreq] = useState(261.63)

    // On-Screen Keyboard Configuration
    // MIDI numbers range from 0 to 128 (C-1 to G#9).
    // However, react-piano only allows MIDI numbers from 12 to 128 (C0 to G#9).
    // Therefore, the user can only play the react-piano's range when using the on-screen keyboard, 
    // but can still play the full MIDI range with a MIDI controller. (TODO: test this)
    // Starts at C3
    const [firstNote, setFirstNote] = useState(NoteToMidi('c' + synthesizer.audioConfiguration.currentOctave));
    const [lastNote, setLastNote] = useState(NoteToMidi('b' + synthesizer.audioConfiguration.currentOctave));
    const [firstHiddenNote, setFirstHiddenNote] = useState(NoteToMidi('c' + (synthesizer.audioConfiguration.currentOctave + 1)));
    const [lastHiddenNote, setLastHiddenNote] = useState(NoteToMidi('b' + (synthesizer.audioConfiguration.currentOctave + 1)));
    const [keyboardShortcuts, setKeyboardShortcuts] = useState(KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    }));
    const [hiddenKeyboardShortcuts, setHiddenKeyboardShortcuts] = useState(KeyboardShortcuts.create({
        firstNote: firstHiddenNote,
        lastNote: lastHiddenNote,
        keyboardConfig: [{
            natural: 'k',
            flat: 'i',
            sharp: 'o'
          }, {
            natural: 'l',
            flat: 'o',
            sharp: 'p'
          }, {
            natural: ';',
            flat: 'p',
            sharp: '['
          }, {
            natural: "'",
            flat: '[',
            sharp: ']'
          }]
    }));

    //Records keypress for frequency assignment
    const readKey = () => new Promise(resolve => window.addEventListener('keydown', resolve, { once: true }));
    const homerow = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J']

    //Assign-key popper values
    const [open, setOpen] = React.useState(false); //opens and closes popper
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); //sets position of popper under the clicked button
    const canBeOpen = Boolean(anchorEl); //boolean, if popper meets requirements to open, used in id
    const id = canBeOpen ? 'simple-popover' : undefined; //id for poppers

    //Assigns default frequencies on page load
    useEffect(() => {
        updateOnScreenKeyboard()
        frequencyBar.createFrequencyBar(freqBarValue, synthesizer.audioConfiguration.currentOctave, baseFreq);
        createFrequencyBar()
    }, []);

    function updateOnScreenKeyboard() {

        var notes: {[key: string]: number} = NotesFromOctave(synthesizer.audioConfiguration.currentOctave);

        setFirstNote(notes['firstNote']);
        setLastNote(notes['lastNote']);
        setFirstHiddenNote(notes['firstHiddenNote']);
        setLastHiddenNote(notes['lastHiddenNote']);

        setKeyboardShortcuts(KeyboardShortcuts.create({
            firstNote: notes['firstNote'],
            lastNote: notes['lastNote'],
            keyboardConfig: KeyboardShortcuts.HOME_ROW,
        }));

        setHiddenKeyboardShortcuts(KeyboardShortcuts.create({
            firstNote: notes['firstHiddenNote'],
            lastNote: notes['lastHiddenNote'],
            keyboardConfig: [{
                natural: 'k',
                flat: 'i',
                sharp: 'o'
              }, {
                natural: 'l',
                flat: 'o',
                sharp: 'p'
              }, {
                natural: ';',
                flat: 'p',
                sharp: '['
              }, {
                natural: "'",
                flat: '[',
                sharp: ']'
              }]
        }));
    }

    //Updates the value of the frequency bar as you slide it around
    const changeSliderValue = (event: any, value: number) => {
        setFreqBarValue(value); 
    };

    //Finalizes the value of the frequency bar when you release your mouse, 
    const changeSliderValueCommitted = (event: any, value: number) => {
        setFreqBarValue(value);        
        frequencyBar.createFrequencyBar(freqBarValue, synthesizer.audioConfiguration.currentOctave, baseFreq);
        createFrequencyBar();
    };
 
    const activeButton = "btn 2xl:h-13 2xl:w-13 xl:h-11 xl:w-11 lg:h-9 lg:w-9 md:h-8 md:w-8 sm:h-8 sm:w-8 xs:w-8 xs:h-8 font-agrandir text-md text-black bg-gold border-b-2 border-r-2 border-black uppercase"
    const inactiveButton = 'btn 2xl:h-13 2xl:w-13 xl:h-11 xl:w-11 lg:h-9 lg:w-9 md:h-8 md:w-8 sm:h-8 sm:w-8 xs:w-8 xs:h-8 font-agrandir text-md text-black bg-white border-b-2 border-r-2 border-black hover:bg-gray-200'

    //creates freq bar with the number of boxes set by the slider value
    function createFrequencyBar() {
        let freqBarArr = []
        
        for (let i = 0; i < frequencyBar.notesPerOctave.valueOf(); i++) {
            freqBarArr.push
            (
            <Tooltip describeChild title={frequencyBar.octaves[frequencyBar.currentOctave][i]} key={i} placement="top">
                <button 
                    aria-describedby={id}
                    key={i}
                    i-key = {i}
                    className={`${frequencyBar.frequencyMappings.has(i) ? activeButton : inactiveButton} + ${i == 0 ? 'rounded-l-md': ""} + ${i == (freqBarValue - 1) ? 'rounded-r-md' : ""}` + 
                    " 2xl:text-lg xl:text-md lg:text-sm md:text-xs sm:text-xs xs:text-xs"} 
                    onClick={(e) => updateAssignedKey(e)}>
                        {Math.floor(frequencyBar.octaves[frequencyBar.currentOctave][i])}
                        {<br/>}
                        {homerow[frequencyBar.frequencyMappings.get(i)]}
                </button>
            </Tooltip>
            )
        }
        
        setFreqBar(freqBarArr)
    }

    async function updateAssignedKey(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorEl(e.currentTarget)
        setOpen(true)
        let newAssignment = parseInt(e.currentTarget.getAttribute('i-key'))
        await frequencyBar.changeAssignment(newAssignment)
        setOpen(false)
        setAnchorEl(null)
        createFrequencyBar();
        
    }

    function changeBaseFreq(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const amount = e.target.value
    
        if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
          setBaseFreq( parseFloat(amount) );
          console.log(baseFreq)
        }
    };

    async function changeBaseFreqCommitted(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            frequencyBar.createFrequencyBar(freqBarValue, synthesizer.audioConfiguration.currentOctave, baseFreq);
            createFrequencyBar();
        }
    }

    return (
        <div className="2xl:mt-13 xl:mt-11 lg:mt-9 md:mt-7 sm:mt-5 xs:mt-3">
            {/* <div className="text-white">
                <h1>MIDI Input</h1>
                <button className="btn h-10 w-40 bg-white text-black rounded-md hover:bg-gray-100" onClick={createMIDINote}>Create MIDI Note</button>
                { <button onClick={connectToInstrument}>Connect MIDI Instrument</button> }
                <p>Note Played: </p>
            </div>
            <div className="text-white">
                <h1>MIDI Input</h1>
                <button className="btn h-10 w-40 bg-white text-black rounded-md hover:bg-gray-100 mb-10" onClick={playSound}>Play Sound</button>
            </div> */}
            
            <Grid container direction="row" justifyContent="center" alignItems="center">
                
                {freqBar.map(item => item)}
                <Popper id={id} open={open} anchorEl={anchorEl} className="w-35 h-10 bg-white rounded-md font-agrandir-wide text-black text-center">
                    <p className="mt-2 mx-2">Assign key...</p>
                </Popper>
                <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
                    <button className="btn 2xl:h-8 2xl:w-8 xl:h-8 xl:w-8 lg:h-7 lg-w-7 md:h-7 md:w-7 sm:h-6 sm:w-6 xs:h-6 xs:w-6 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
                </Tooltip>
            </Grid>

            <Grid container direction="row" justifyContent="center" className="mt-13">
                <Grid>
                    <button className="btn bg-white text-black rounded-md hover:bg-gray-100 mb-10" onClick={octaveUp}>Octave Up</button>
                    <button className="btn bg-white text-black rounded-md hover:bg-gray-100 mb-10" onClick={octaveDown}>Octave Down</button>
                </Grid>
                <div className="2xl:w-1000 2xl:h-450 xl:w-800 xl:h-360 lg:w-700 lg:h-315 md:w-500 md:h-225 sm:w-350 sm:h-150 xs:w-250 xs:h-100">
                    <Piano
                        activeNotes={synthesizer.activeNotes}
                        className="mx-auto my-auto"
                        noteRange={{ first: firstNote, last: lastNote }}
                        playNote={synthesizer.NoteOn}
                        stopNote={synthesizer.NoteOff}
                        keyboardShortcuts={keyboardShortcuts}
                    />
                </div>
            </Grid>

            <Grid container className="flex absolute 2xl:h-350 xl:h-275 lg:h-200 md:h-150 sm:h-100 xs:h-80 2xl:mt-13 xl:mt-11 lg:mt-9 md:mt-7 sm:mt-5 xs:mt-3">
                <Grid item xs={4} className="container max-w-2xl border-gold border-t-2 border-r-2 rounded-tr-xl bg-bglight ml-auto ">
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
                        onClick={e => {e.preventDefault(); setOpenTab(1)}}
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
                        onClick={e => {e.preventDefault();setOpenTab(2)}}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                    >
                        SCALA
                    </a>
                    </li>
                </ul>
                
                <div className="container max-w-2xl bg-bglight mr-auto">
                    <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white">NOTES PER OCTAVE</div>
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
                                        value={freqBarValue}
                                        onChange={changeSliderValue}
                                        onChangeCommitted={changeSliderValueCommitted}
                                        sx={{color: 'white'}}
                                    />
                                </FormControl>
                            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-2">MIDI DEVICE</div>
                                    <FormControl fullWidth className="max-w-md font-agrandir-wide" sx={{color: 'white', fontFamily: 'Agrandir-Wide'}}>
                                        <Select value={0} sx={{background: 'white', marginTop: '5px', fontFamily: 'Agrandir-Wide'}}>
                                            <MenuItem value={0} sx={{fontFamily: 'Agrandir-Wide'}}>MIDI KEYBOARD</MenuItem>
                                        </Select>
                                    </FormControl>

                            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-3">BASE FREQUENCY</div>
                                <TextField fullWidth className="max-w-md" 
                                    sx={{marginTop: '5px', background: 'white', borderRadius: '4px', input: {color: 'black', fontFamily: 'Agrandir-Wide'}}}
                                    type='number'
                                    inputProps={{step: '0.0001'}}
                                    value={baseFreq} 
                                    onChange={changeBaseFreq}
                                    onKeyDown={changeBaseFreqCommitted}
                                />
                            </div>

                            
                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <Button 
                                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs"
                                sx={{background: 'white', fontFamily: 'Agrandir-Wide', color: 'black', border: 1,'&:hover': {background: '#FFD059'}}}
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
                                sx={{background: 'white', fontFamily: 'Agrandir-Wide', color: 'black', border: 1,'&:hover': {background: '#FFD059'}}}
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
            </Grid>
                

                <Grid item xs={1}></Grid>

                <Grid item xs={7} className="container max-w-8xl bottom-0 border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight ml-auto">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row border-b-2 border-gold"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                            "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal hover:underline " +
                            (openRightTab === 1 ? "text-gold underline" : "text-white")}
                            onClick={e => {e.preventDefault(); setOpenRightTab(1)}}
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
                            (openRightTab === 2 ? "text-gold underline" : "text-white")}
                            onClick={e => {e.preventDefault();setOpenRightTab(2)}}
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
                            <div className={openRightTab === 1 ? "block" : "hidden"} id="link1">
                            
                            </div>
                            <div className={openRightTab === 2 ? "block" : "hidden"} id="link2">
                                <div className='container h-150'>
                                    <Oscillator/>
                                    <Oscillator/>
                                    <Oscillator/>
                                    <Oscillator/>
                                    <Oscillator/>
                                    <Oscillator/>
                                    <Oscillator/>
                                    <br /><br />
                                    <Knobs onChange={(value) => console.log(value)} />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                                    
                </Grid>

            </Grid>
            <div className="container invisible">
                <Piano
                    className="mx-auto my-auto"
                    noteRange={{ first: firstHiddenNote, last: lastHiddenNote }}
                    playNote={synthesizer.NoteOn}
                    stopNote={synthesizer.NoteOff}
                    keyboardShortcuts={hiddenKeyboardShortcuts}
                />
            </div>
        </div>
    );
}

/*
Horizontal slider. Does work.
                                <Slider
                                aria-label="Slider1"
                                defaultValue={0}
                                //getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                                sx={{color: 'white'}}
                        */