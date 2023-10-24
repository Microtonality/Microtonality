import {Piano as ReactPiano} from "react-piano";
import * as React from "react";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import {KeyShortcut} from "../../utility/microtonal/PianoKeyMapping";
import MidiReceiver from "../../utility/midi/MIDIReceiver";
import {useMConfig} from "./PlayProvider";
import { useEffect, useState } from "react";

interface ReactPianoWrapperProps {
    midiReceiver: MidiReceiver,
    keyMapping: Record<number, number>, 
    keyboardShortcuts: Array<KeyShortcut>,
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

    const scaleConfig: ScaleConfig = useMConfig().scaleConfig;

    // React Piano does not let you override its inputs,
    // so we remove the component's pointer events with Tailwind when a key is down.
    // This prevents the mouse from messing with notes that are being played.
    //
    // You can force an edge case by holding the mouse over
    // the edge of a key, pressing that key on your keyboard,
    // and moving the mouse outside the key. But this still works.
    const [usingKeys, setUsingKeys] = useState(false);
    const playableKeys: string[] = props.keyboardShortcuts.map((key: KeyShortcut): string => (key.key));
    const currentKeys: string[] = [];

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent): void {
            if (!playableKeys.includes(event.key) || currentKeys.includes(event.key))
                return;
    
            currentKeys.push(event.key);
            setUsingKeys(true);
        }
    
        function onKeyUp(event: KeyboardEvent): void {
            if (!currentKeys.includes(event.key))
                return;
    
            currentKeys.splice(currentKeys.indexOf(event.key), 1);
            setUsingKeys(currentKeys.length > 0);
        }

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    
        return function cleanup() {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }
    });

    return <>
        <style dangerouslySetInnerHTML={{__html: `
          .ReactPiano__Keyboard > div.ReactPiano__Key--accidental:nth-child(n+${scaleConfig.keysPerOctave + 1}) {
            background: ${blackKey};
          }
          .ReactPiano__Keyboard > div.ReactPiano__Key--natural:nth-child(n+${scaleConfig.keysPerOctave + 1}) {
            background: ${whiteKey};
          }
          .ReactPiano__Keyboard > div.ReactPiano__Key--active:nth-child(n+${scaleConfig.keysPerOctave + 1}) {
            background: ${activeKey};
          }
        `}} />

        <div className="w-2/3">
            <ReactPiano
                className={(usingKeys) ? 'pointer-events-none' : ''}
                // activeNotes={props.synthesizer.activeNotes} // TODO: Hook up midi events
                noteRange={{ first: props.rootKey + props.keyOffset, last: props.rootKey + props.keyOffset + props.keyboardLength }}
                playNote={(note: any) => {props.midiReceiver.noteOn(note, DEFAULT_VELOCITY)}}
                stopNote={(note: any) => {props.midiReceiver.noteOff(note)}}
                keyboardShortcuts={props.keyboardShortcuts}
            />
        </div>
    </>
}