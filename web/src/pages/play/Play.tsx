import * as React from 'react';
import { Grid, Popper, Tooltip } from '@mui/material';
import { Piano, KeyboardShortcuts } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';
import { Synthesizer } from '../../synthesizer/Synthesizer';
import { NoteToMidi, NotesFromOctave } from '../../utility/midi/NoteToMidiConverter';
import FrequencyBar from '../../synthesizer/FrequencyBar';
import ADSR from "./ADSR";
import BasicSettings from "./BasicSettings";
import PianoKeyButton from "../../ui/PianoKeyButton";

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
                    "xl:text-md lg:text-sm text-xs"}
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
        <div className="xl:mt-11 md:mt-7 mt-3 flex-1 flex flex-col justify-between">
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

            <div className={"flex flex-col items-center h-1/3"}>
                <div className="flex items-center max-w-full w-2/3 h-full">
                    <div className={"flex flex-col h-full mr-1"}>
                        <span className={"text-white text-center"}>Octave</span>
                        <PianoKeyButton faceUp className={"lg:w-24 w-16 h-1/2"} onClick={octaveUp}>
                            <span className={"text-center"}>PgUp</span>
                        </PianoKeyButton>
                        <PianoKeyButton className={"lg:w-24 w-16 h-1/2"} onClick={octaveDown}>
                            <span className={"text-center"}>PgDown</span>
                        </PianoKeyButton>
                    </div>
                    <div className={"h-full flex flex-col w-full"}>
                        <div className={"flex justify-center align-center"}>
                            {freqBar.map(item => item)}
                            <Popper id={id} open={open} anchorEl={anchorEl} className="w-35 h-10 bg-white rounded-md font-agrandir-wide text-black text-center">
                                <p className="mt-2 mx-2">Assign key...</p>
                            </Popper>
                            <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
                                <button className="btn 2xl:h-8 2xl:w-8 xl:h-8 xl:w-8 lg:h-7 lg-w-7 md:h-7 md:w-7 sm:h-6 sm:w-6 xs:h-6 xs:w-6 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
                            </Tooltip>
                        </div>
                        <Piano
                            activeNotes={synthesizer.activeNotes}
                            className="mx-auto my-auto"
                            noteRange={{ first: firstNote, last: lastNote }}
                            playNote={synthesizer.NoteOn}
                            stopNote={synthesizer.NoteOff}
                            keyboardShortcuts={keyboardShortcuts}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between h-1/2">

                <BasicSettings freqBarValue={freqBarValue} baseFreq={baseFreq} changeSliderValue={changeSliderValue}
                           changeSliderValueCommitted={changeSliderValueCommitted} changeBaseFreq={changeBaseFreq}
                           changeBaseFreqCommitted={changeBaseFreqCommitted}></BasicSettings>

                <ADSR/>

            </div>
            {/*<div className="container invisible">*/}
            {/*    <Piano*/}
            {/*        className="mx-auto my-auto"*/}
            {/*        noteRange={{ first: firstHiddenNote, last: lastHiddenNote }}*/}
            {/*        playNote={synthesizer.NoteOn}*/}
            {/*        stopNote={synthesizer.NoteOff}*/}
            {/*        keyboardShortcuts={hiddenKeyboardShortcuts}*/}
            {/*    />*/}
            {/*</div>*/}
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