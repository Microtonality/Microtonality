import * as React from 'react';
import { Grid, Popper, Fade, Slider, Tooltip, FormControl, InputLabel, Select, MenuItem, Box, Tabs, Tab, Button, Menu } from '@mui/material';
import { Piano, KeyboardShortcuts } from 'react-piano';
import './piano.css';
import { useState, useEffect } from 'react';
import { Synthesizer } from './Synthesizer';
import { NoteToMidi, NotesFromOctave } from '../../utility/midi/NoteToMidiConverter';
import FrequencyBar from './FrequencyBar';

// TODO: When a user is holding down a note and changes the octave,
// the note remains downpressed on the original octave.
// You then need to press the note twice to play it.
const synthesizer = new Synthesizer();

const frequencyBar = new FrequencyBar();

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
    const canBeOpen = open && Boolean(anchorEl); //boolean, if popper meets requirements to open, used in id
    const id = canBeOpen ? 'transition-popper' : undefined; //id for poppers

    //Assigns default frequencies on page load
    useEffect(() => {
        updateOnScreenKeyboard()
        frequencyBar.createFrequencyBar(freqBarValue, synthesizer.audioConfiguration.currentOctave);
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
        frequencyBar.createFrequencyBar(freqBarValue, synthesizer.audioConfiguration.currentOctave);
        createFrequencyBar();
    };
 
    const activeButton = "btn h-13 w-13 font-agrandir text-md text-black bg-gold border-b-2 border-r-2 border-black uppercase"
    const inactiveButton = 'btn h-13 w-13 font-agrandir text-md text-black bg-white border-b-2 border-r-2 border-black hover:bg-gray-200'

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
                    className={`${frequencyBar.frequencyMappings.has(i) ? activeButton : inactiveButton} + ${i == 0 ? 'rounded-l-md': ""} + ${i == (freqBarValue - 1) ? 'rounded-r-md' : ""}`} 
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
        let newAssignment = parseInt(e.currentTarget.getAttribute('i-key'))
        await frequencyBar.changeAssignment(newAssignment)
        createFrequencyBar();
    }

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }
        
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                className="font-agrandirwide text-white text-xl"
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                    </Box>
                )}
            </div>
        );
    }
        
    function allyProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [leftTabValue, setLeftTabValue] = React.useState(0);
    const [rightTabValue, setRightTabValue] = React.useState(0);

    const changeLeftTab = (event: React.SyntheticEvent, newValue: number) => {
        setLeftTabValue(newValue);
    };
    const changeRightTab = (event: React.SyntheticEvent, newValue: number) => {
        setRightTabValue(newValue);
    };

    return (
        <div className="mt-13">
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
            
            

            {/* <Popper id={id} open={open} anchorEl={anchorEl} transition className="w-35 h-10 bg-white rounded-md font-agrandir text-black text-center">
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <p className="mt-2 mx-2">Assign key...</p>
                </Fade>
            )}
            </Popper> */}
            <Grid container direction="row" justifyContent="center" alignItems="center">
                
                {freqBar.map(item => item)}
                <Tooltip describeChild title="Click a frequency box and then press the key on your keyboard you want it to correspond to">
                    <button className="btn h-8 w-8 bg-white text-black rounded-3xl hover:bg-gray-100 ml-2">?</button>
                </Tooltip>
            </Grid>

            <Grid container direction="row" justifyContent="center">
                <Grid>
                    <button className="btn h-10 w-40 bg-white text-black rounded-md hover:bg-gray-100 mb-10" onClick={octaveUp}>Octave Up</button>
                    <button className="btn h-10 w-40 bg-white text-black rounded-md hover:bg-gray-100 mb-10" onClick={octaveDown}>Octave Down</button>
                </Grid>
                <div className="h-450 w-1000">
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

            <Grid container className="flex absolute bottom-0">
                
                <Grid item xs={4} className="container max-w-2xl border-gold border-t-2 border-r-2 rounded-tr-xl bg-bglight ml-auto ">
                    <Box className="border-b-2 border-gold font-agrandirwide text-white">
                        <Tabs TabIndicatorProps={{style: {background: '#ffd059', font: 'white'}}} value={leftTabValue} onChange={changeLeftTab} centered>
                            <Tab label="SETTINGS" {...allyProps(0)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="SCALA" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                        </Tabs>
                    </Box>
                    
                    <TabPanel value={leftTabValue} index={0}>
                        <div className="text-xl font-agrandir-wide text-white">NOTES PER OCTAVE</div>
                        <Slider
                            className='max-w-2xl'
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

                        <div className="text-xl font-agrandir-wide text-white">MIDI DEVICE</div>
                        <FormControl fullWidth className="max-w-md">
                            <InputLabel>MIDI DEVICE</InputLabel>
                            <Select value={0}>
                                <MenuItem value={0}>MIDI Keyboard</MenuItem>
                            </Select>
                        </FormControl>
                    </TabPanel>

                    <TabPanel value={leftTabValue} index={1}>
                        <Button 
                            sx={{
                                background: 'white',
                                fontFamily: 'Agrandir-Wide',
                                color: 'black',
                                border: 1,
                                '&:hover': {background: '#FFD059'}
                            }}
                            variant="contained"
                            component="label"
                            >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                    </TabPanel>
                </Grid>

                <Grid item xs={1}></Grid>

                <Grid item xs={7} className="container max-w-8xl bottom-0 border-gold border-t-2 border-l-2 rounded-tl-xl bg-bglight ml-auto">
                    <Box className="border-b-2 border-gold font-agrandirwide text-white">
                        <Tabs TabIndicatorProps={{style: {background: '#ffd059', font: 'white'}}} value={rightTabValue} onChange={changeRightTab} centered>
                            <Tab label="ADSR" {...allyProps(0)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="1" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="2" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="3" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="4" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="5" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                            <Tab label="6" {...allyProps(1)} sx={{fontFamily: 'Agrandir-Wide', fontSize: '20px', color: 'white', '&.Mui-selected': {color: '#FFD059'}}}/>
                        </Tabs>
                    </Box>

                    <TabPanel value={rightTabValue} index={0}>
                        ADSR
                    </TabPanel>
                    <TabPanel value={rightTabValue} index={1}>
                        Synthesizer 1
                    </TabPanel>
                    <TabPanel value={rightTabValue} index={2}>
                        Synthesizer 2
                    </TabPanel>
                    <TabPanel value={rightTabValue} index={3}>
                        Synthesizer 3
                    </TabPanel>
                    <TabPanel value={rightTabValue} index={4}>
                        Synthesizer 4
                    </TabPanel>
                    <TabPanel value={rightTabValue} index={5}>
                        Synthesizer 5
                    </TabPanel>
                    <TabPanel value={rightTabValue} index={6}>
                        Synthesizer 6
                    </TabPanel>
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
