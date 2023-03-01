import {AdditiveSynthesizer} from "../audio/AdditiveSynthesizer"
import {ScaleConfig, DEFAULT_SCALE_CONFIG} from "../MicrotonalConfig";

export default class MidiReceiver {

    public midiInput: WebMidi.MIDIInput[] = [];
    public midiOutput: WebMidi.MIDIOutput[] = [];

    public synth: AdditiveSynthesizer = new AdditiveSynthesizer()
    public config: ScaleConfig = DEFAULT_SCALE_CONFIG

    private static NOTE_ON_MESSAGE: number = 144;
    private static NOTE_OFF_MESSAGE: number = 128;
    private static PITCH_BEND_MESSAGE: number = 224;

    constructor(synth: AdditiveSynthesizer, config: ScaleConfig) {
        this.synth = synth;
        this.config = config;
    }

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

        if (command == MidiReceiver.NOTE_ON_MESSAGE) {
            let note = message.data[1]
            let velocity = message.data[2]

            this.noteOn(note, velocity)
        } else if (command == MidiReceiver.NOTE_OFF_MESSAGE) {
            let note = message.data[1]

            this.noteOff(note)
        } else if (command == MidiReceiver.PITCH_BEND_MESSAGE) {
            let finePitchBend = message.data[1]
            let coarsePitchBend = message.data[2]

            //this.setGlobalPitchBend(finePitchBend, coarsePitchBend)
        } else {
            console.warn("This MIDI Input is not supported yet!")
        }
    }

    public noteOn(note: number, velocity: number) {
        if (note == null || note < 0 || isNaN(note)) {
            console.warn("Invalid note received!");
            return;
        }

        let frequency = this.MidiNotesToFrequency(note)
        frequency = 440;
        console.log("Start playing Freq: " + frequency);

        this.synth.onPlayFrequency(frequency, velocity)
    }

    public noteOff(note: number) {
        if (note == null || note < 0 || isNaN(note)) {
            console.warn("Invalid note received!");
            return;
        }

        let frequency = this.MidiNotesToFrequency(note)
        frequency = 440;
        console.log("Stop playing Freq: " + frequency);

        this.synth.onStopFrequency(frequency)
    }

    private MidiNotesToFrequency(MidiNote: number): number {
        // First, we need to determine which key in the octave this is.
        let octaveKey = (MidiNote - this.config.rootKey) % this.config.keysPerOctave;
        if (octaveKey < 0) {
            octaveKey += this.config.keysPerOctave;
        }

        // Now, determine how many octaves away we are.
        let octaveOffset = Math.floor((MidiNote - this.config.rootKey) / this.config.keysPerOctave);

        // Which multiplier is this key mapped to?
        let multiplier;
        try {
            multiplier = this.config.scale.notes[octaveKey].multiplier;
        } catch (e) {
            console.log(`Error: key in octave ${octaveKey} (MIDI number: ${MidiNote}) is not assigned to a note in the scale.`)
            throw e;
        }

        // Finally, convert to a frequency.
        let noteFrequency = multiplier * this.config.tuningFrequency * Math.pow(2, octaveOffset);

        return noteFrequency;
    }
}