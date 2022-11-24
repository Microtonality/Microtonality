import { onMIDIMessage } from './MIDIReceiver';

// supported notes
const Notes = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370, 392, 415.3, 440, 466.2, 493.9, 523.3]

function OnNotePressed(note: number) {
    let message: WebMidi.MIDIMessageEvent;
    if (Notes.includes(note)){
        message.data[0] = 144; // noteOn
        message.data[1] = note; // pitch
        message.data[2] = 60;   // velocity
        onMIDIMessage(message);
    }
    else {
        console.error("the note: " + note + " is not supported")
    }
}