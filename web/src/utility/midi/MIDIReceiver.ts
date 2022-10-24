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
            break;
        case 128: // noteOff
            noteOff(note);
            break;
        default:
            console.warn("This MIDI Input is not supported yet!");
    }
}

function noteOn(note: number, velocity: number) {
    // Find correct frequency for note

    // Send new note w/ velocity to sound generator
}

function noteOff(note: number) {

}