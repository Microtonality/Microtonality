import {AdditiveSynthesizer} from "../audio/AdditiveSynthesizer"
import {DEFAULT_SCALE_CONFIG, ScaleConfig} from "../MicrotonalConfig";
import {RatioNote} from "../microtonal/notes";
import {scaleDegreeToNote} from "../microtonal/Scale";

export default class MidiReceiver {

    public midiInput: WebMidi.MIDIInput[] = [];
    public midiOutput: WebMidi.MIDIOutput[] = [];
    
    public synth: AdditiveSynthesizer
    public config: ScaleConfig
    public keyMapping: Record<number, number>

    private static NOTE_ON_MESSAGE: number = 144;
    private static NOTE_OFF_MESSAGE: number = 128;
    private static PITCH_BEND_MESSAGE: number = 224;

    constructor(synth: AdditiveSynthesizer, config: ScaleConfig, keyMapping: Record<number, number>) {
        this.synth = synth;
        this.config = config;
        this.keyMapping = keyMapping;
        this.connectToInstrument()
    }

    public connectToInstrument() {
        navigator.requestMIDIAccess().then(
            (midi) => {
                this.initDevices(midi)

                midi.onstatechange = (event) => {
                    this.initDevices(midi)
                };
            },
            (err) => console.warn('unable to connect to midi', err),
        )
    }

    public initDevices(midi: WebMidi.MIDIAccess) {
        this.midiInput = []
        this.midiOutput = []

        for (let input of midi.inputs.values()) {
            this.midiInput.push(input)
            input.onmidimessage = this.onMIDIMessage.bind(this)
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

        let frequency = this.MidiNotesToFrequency(note);

        this.synth.onPlayFrequency(frequency, velocity);
    }

    public noteOff(note: number) {
        if (note == null || note < 0 || isNaN(note)) {
            console.warn("Invalid note received!");
            return;
        }

        let frequency = this.MidiNotesToFrequency(note);

        this.synth.onStopFrequency(frequency);
    }

    public MidiNotesToFrequency(MidiNote: number): number {
        // First, we need to determine which key in the octave this is.
        // This is figuring out where it is on the MIDI keyboard, so we can map it to our scale
        let octaveKey = (MidiNote - this.config.rootKey) % this.config.keysPerOctave;

        // If this somehow goes negative, bring it positive
        while (octaveKey < 0) {
            octaveKey += this.config.keysPerOctave;
        }

        // Now, determine how many keyboard octaves away we are from the root key.
        let octaveOffset = Math.floor((MidiNote - this.config.rootKey) / this.config.keysPerOctave);

        // Now we have the octaveKey and the octaveOffset, we can determine how it should be mapped
        let multiplier;
        let scaleDegree;
        let note;
        try {
            scaleDegree = this.keyMapping[octaveKey];
            note = scaleDegreeToNote(this.config.scale, scaleDegree);
            multiplier = note.multiplier;
        } catch (e) {
            console.log(`Error: key in octave ${octaveKey} (MIDI number: ${MidiNote}) is not assigned to a note in the scale.`)
            return null;
        }

        return this.ScaleDegreeToFrequency(scaleDegree, octaveOffset)
    }

    public ScaleDegreeToFrequency(scaleDegree: number, octave: number): number {
        let note = scaleDegreeToNote(this.config.scale, scaleDegree);
        let multiplier = note.multiplier;

        // Finally, convert to a frequency.
        return this.config.tuningFrequency * Math.pow(this.config.scale.octaveNote.multiplier, multiplier - 1) * Math.pow(this.config.scale.octaveNote.multiplier, octave);
    }
}