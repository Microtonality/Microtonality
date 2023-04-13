import {KeyboardShortcuts, Piano as ReactPiano} from "react-piano";
import * as React from "react";
import {ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import {useEffect} from "react";
import {createPianoKeyboardShortcuts, KeyShortcut} from "../../utility/microtonal/PianoKeyMapping";
import {AdditiveSynthesizer} from "../../utility/audio/AdditiveSynthesizer";
import MidiReceiver from "../../utility/midi/MIDIReceiver";

interface ReactPianoWrapperProps {
    midiReceiver: MidiReceiver,
    keyMapping: Record<number, number>, 
    keyboardShortcuts: Array<KeyShortcut>,
    scaleConfig: ScaleConfig, 
    rootKey: number,
    keyOffset: number,
    keyboardLength: number
}

const DEFAULT_VELOCITY = 60;


// @ts-ignore
const whiteKey = TAILWIND_COLORS_NEUTRAL['400'];
// @ts-ignore
const blackKey = TAILWIND_COLORS_NEUTRAL['900'];
// @ts-ignore
const activeKey = TAILWIND_COLORS_BLUE['400'];

// The rootkey here is given differently so we can display the keyboard in a different place than the configured root
// note. Ex. A4 == 440 but keyboard starts a C3
export default function ReactPianoWrapper(props: ReactPianoWrapperProps) {
    return <>
        <style dangerouslySetInnerHTML={{__html: `
          .ReactPiano__Keyboard > div.ReactPiano__Key--accidental:nth-child(n+${props.scaleConfig.keysPerOctave + 1}) {
            background: ${blackKey};
          }
          .ReactPiano__Keyboard > div.ReactPiano__Key--natural:nth-child(n+${props.scaleConfig.keysPerOctave + 1}) {
            background: ${whiteKey};
          }
          .ReactPiano__Keyboard > div.ReactPiano__Key--active:nth-child(n+${props.scaleConfig.keysPerOctave + 1}) {
            background: ${activeKey};
          }
        `}} />
        <ReactPiano
        // activeNotes={synthesizer.activeNotes} TODO: Hook up midi events
        className="mx-auto my-auto"
        noteRange={{ first: props.rootKey + props.keyOffset, last: props.rootKey + props.keyOffset + props.keyboardLength }}
        playNote={(note: any) => {props.midiReceiver.noteOn(note, DEFAULT_VELOCITY)}}
        stopNote={(note: any) => {props.midiReceiver.noteOff(note)}}
        keyboardShortcuts={props.keyboardShortcuts}
    /></>
}