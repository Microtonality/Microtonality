let midiInput: WebMidi.MIDIInput[] = [];
let midiOutput: WebMidi.MIDIOutput[] = [];

const NOTE_ON_MESSAGE = 144;
const NOTE_OFF_MESSAGE = 128;
const PITCH_BEND_MESSAGE = 224;

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

function onMIDIMessage(message: WebMidi.MIDIMessageEvent) {
    let command = message.data[0]

    if (command == NOTE_ON_MESSAGE) {
        let note = message.data[1]
        let velocity = message.data[2]

        noteOn(note, velocity)
    } else if (command == NOTE_OFF_MESSAGE) {
        let note = message.data[1]

        noteOff(note)
    } else if (command == PITCH_BEND_MESSAGE) {
        let finePitchBend = message.data[1]
        let coarsePitchBend = message.data[2]

        setGlobalPitchBend(finePitchBend, coarsePitchBend)
    } else {
        console.warn("This MIDI Input is not supported yet!")
    }
}

export function noteOn(note: number, velocity: number) {
    // Find correct frequency for note
    let frequency = note;

    // Send new note w/ velocity to sound generator
}

export function noteOff(note: number) {
    // Fidn correct frequency for note

    // Find new note to disable.
}

export function setGlobalPitchBend(finePitchBend: number, coarsePitchBend: number) {
    // Probably move this to another class specifically for pitch bend calculation
}