import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    NavLink
} from "react-router-dom";
import * as React from 'react';

export default function Play() {
    function createMIDINote() {

    }

    function playSound() {

    }

    function connectToInstrument() {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(
                onMIDISuccess, onMIDIFailure
            )
        } else {
            alert("No MIDI support in your browser.")
        }
    }

    function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
        console.log('MIDI Access Object: ' + midiAccess)

        for (let input of midiAccess.inputs.values()) {
            input.onmidimessage = getMIDIMessage;
        }
    }

    function onMIDIFailure(e: Error) {
        console.log('MIDI Access Failed! Error: ' + e)
    }

    function getMIDIMessage(message: WebMidi.MIDIMessageEvent) {
        let command = message.data[0];
        let note = message.data[1];
        let velocity = (message.data.length > 2) ? message.data[2] : 0;

        switch (command) {
            case 144: // noteOn
                noteOn(note, velocity);
            case 128: // noteOff
                noteOff(note);
            default:
                console.warn("This MIDI Input is not supported yet!");
        }
    }

    function noteOn(note: number, velocity: number) {

    }

    function noteOff(note: number) {

    }

    return (
        <div className='play'>
            <div className='midi-input'>
                <h1>MIDI Input</h1>
                <button onClick={createMIDINote}>Create MIDI Note</button>
                <button onClick={connectToInstrument}>Connect MIDI Instrument</button>
                <p>Note Played: </p>
            </div>
            <div className='audio'>
                <h1>MIDI Input</h1>
                <button onClick={playSound}>Play Sound</button>
            </div>
        </div>
    );
}