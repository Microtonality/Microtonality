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
    keyOffset: number
}

const DEFAULT_VELOCITY = 60;

// The rootkey here is given differently so we can display the keyboard in a different place than the configured root
// note. Ex. A4 == 440 but keyboard starts a C3
export default function ReactPianoWrapper(props: ReactPianoWrapperProps) {
    // Configuring ReactPiano to handle the odd key configuring is just more trouble than it's worth
    // We use the keymapping to convert from the incoming MIDI number given by it to the proper MIDI note
    const translateNote = (note: number) => {
        let mapping = props.keyMapping[(note - props.rootKey) % props.scaleConfig.keysPerOctave];
        let octaveAdditive = Math.floor((note - props.rootKey) / props.scaleConfig.keysPerOctave) * props.scaleConfig.scale.notes.length;
        return mapping + octaveAdditive;
    }
    
    return <ReactPiano
        // activeNotes={synthesizer.activeNotes}
        className="mx-auto my-auto"
        noteRange={{ first: props.rootKey + props.keyOffset, last: props.rootKey + (false ? 11 : props.scaleConfig.keysPerOctave) + props.keyOffset}} // thoughts? TODO
        playNote={(note: any) => {props.midiReceiver.noteOn(note, DEFAULT_VELOCITY)}}
        stopNote={(note: any) => {props.midiReceiver.noteOff(note)}}
        keyboardShortcuts={props.keyboardShortcuts}
    />
}