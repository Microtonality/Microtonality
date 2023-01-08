let midiInput: WebMidi.MIDIInput[] = [];
let midiOutput: WebMidi.MIDIOutput[] = [];

export function connectToInstrument() {
    navigator.requestMIDIAccess().then(
        (midi) => initDevices(midi),
        (err) => console.warn('unable to connect to midi', err)
    )
}

function initDevices(midi: WebMidi.MIDIAccess) {
    midiInput = []
    midiOutput = []

    for (let input of midi.inputs.values()) {
        midiInput.push(input)
        input.onmidimessage = onMIDIMessage
    }

    for (let output of midi.outputs.values()) {
        midiOutput.push(output)
    }
}

export function onMIDIMessage(message: WebMidi.MIDIMessageEvent) {
    let command = message.data[0]
    let note = message.data[1]
    let velocity = (message.data.length > 2) ? message.data[2] : 0

    switch (command) {
        case 144: // noteOn
            noteOn(note, velocity)
            document.getElementById("note_viewer").innerHTML = `${note} at velocity ${velocity}`
            break
        case 128: // noteOff
            noteOff(note);
            break
        default:
            console.warn("This MIDI Input is not supported yet!")
    }
}

function noteOn(note: number, velocity: number) {
    // Find correct frequency for note
    let frequency = note;

    // Send new note w/ velocity to sound generator
}

function noteOff(note: number) {

}