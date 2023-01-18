export class MIDIReceiver {

    public midiInput: WebMidi.MIDIInput[] = [];
    public midiOutput: WebMidi.MIDIOutput[] = [];

    private static NOTE_ON_MESSAGE: number = 144;
    private static NOTE_OFF_MESSAGE: number = 128;
    private static PITCH_BEND_MESSAGE: number = 224;

    public connectToInstrument() {
        navigator.requestMIDIAccess().then(
            (midi) => this.initDevices(midi),
            (err) => console.warn('unable to connect to midi', err)
        )
    }

    public initDevices(midi: WebMidi.MIDIAccess) {
        this.midiInput = []
        this.midiOutput = []

        for (let input of midi.inputs.values()) {
            this.midiInput.push(input)
            input.onmidimessage = this.onMIDIMessage
        }

        for (let output of midi.outputs.values()) {
            this.midiOutput.push(output)
        }
    }

    public onMIDIMessage(message: WebMidi.MIDIMessageEvent) {
        let command = message.data[0]

        if (command == MIDIReceiver.NOTE_ON_MESSAGE) {
            let note = message.data[1]
            let velocity = message.data[2]

            this.noteOn(note, velocity)
        } else if (command == MIDIReceiver.NOTE_OFF_MESSAGE) {
            let note = message.data[1]

            this.noteOff(note)
        } else if (command == MIDIReceiver.PITCH_BEND_MESSAGE) {
            let finePitchBend = message.data[1]
            let coarsePitchBend = message.data[2]

            this.setGlobalPitchBend(finePitchBend, coarsePitchBend)
        } else {
            console.warn("This MIDI Input is not supported yet!")
        }
    }

    public noteOn(note: number, velocity: number) {
        // Find correct frequency for note
        let frequency = note;

        // Send new note w/ velocity to sound generator
    }

    public noteOff(note: number) {
        // Fidn correct frequency for note

        // Find new note to disable.
    }

    public setGlobalPitchBend(finePitchBend: number, coarsePitchBend: number) {
        // Probably move this to another class specifically for pitch bend calculation
    }
}