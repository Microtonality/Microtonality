import { noteOn } from './MIDIReceiver'

const NOTE_PITCHES = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370, 392, 415.3, 440, 466.2, 493.9, 523.3]
const DEFAULT_VELOCITY = 60

function OnNotePressed(note: number) {
    if (NOTE_PITCHES.length - 1 > note) {
        noteOn(NOTE_PITCHES[note], DEFAULT_VELOCITY)
    }
    else {
        console.error("the note: " + note + " is not supported")
    }
}