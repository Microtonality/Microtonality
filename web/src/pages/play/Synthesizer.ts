import { AudioConfiguration } from './AudioConfiguration';
import { NoteToMidi, MIDI_MAX } from '../../utility/midi/NoteToMidiConverter';

export class Synthesizer {

    audioContext: AudioContext;
    gainNode: GainNode;
    oscillators: Array<OscillatorNode>;
    audioConfiguration: AudioConfiguration;

    constructor() {
        this.oscillators = new Array<OscillatorNode>(MIDI_MAX + 1);
        this.audioConfiguration = new AudioConfiguration();
    }

    CreateOscillator(frequency: number): OscillatorNode {

        if (this.audioContext === undefined) {

            this.audioContext = new (window.AudioContext)();

            // TODO: Connect other nodes for effects.
            this.gainNode = new GainNode(this.audioContext);
            this.gainNode.gain.setValueAtTime(0.05, 0);
            this.gainNode.connect(this.audioContext.destination);
        }

        var oscillator: OscillatorNode;
        oscillator = new OscillatorNode(this.audioContext);
        oscillator.frequency.value = frequency;
        oscillator.connect(this.gainNode);

        return oscillator;
    }

    NoteOn(note: number | string) {

        let frequency: number;
        let midiInput: number;
        
        if (typeof note === 'number')
            midiInput = note;
        else if (typeof note === 'string')
            midiInput = NoteToMidi(note);

        if (midiInput === -1 || this.oscillators[midiInput] !== undefined)
            return;

        frequency = this.audioConfiguration.currentScale.frequencies[midiInput];

        var oscillator: OscillatorNode = this.CreateOscillator(frequency);
        oscillator.start();

        this.oscillators[midiInput] = oscillator;
    }

    NoteOff(note: number | string) {

        let midiInput: number;
        
        if (typeof note === 'number')
            midiInput = note;
        else if (typeof note === 'string')
            midiInput = NoteToMidi(note);

        if (midiInput === -1 || this.oscillators[midiInput] === undefined)
            return;

        var oscillator: OscillatorNode = this.oscillators[midiInput];
        oscillator.stop();

        this.oscillators[midiInput] = undefined;
    }
}
