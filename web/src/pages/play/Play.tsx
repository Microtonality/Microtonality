import * as React from 'react'
import {connectToInstrument} from "../../utility/midi/MIDIReceiver";


export default function Play() {
    function createMIDINote() {

    }

    function playSound() {

    }

    return (
        <div className='play'>
            <div className='midi-input'>
                <h1>MIDI Input</h1>
                <button onClick={createMIDINote}>Create MIDI Note</button>
                <button onClick={connectToInstrument}>Connect MIDI Instrument</button>
                <p id="note_viewer">Note Played: </p>
            </div>
            <div className='audio'>
                <h1>MIDI Input</h1>
                <button onClick={playSound}>Play Sound</button>
            </div>
        </div>
    );
}