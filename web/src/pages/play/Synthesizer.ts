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

    NoteOn = (note: number) => {

        let frequency: number;

        if (note === -1 || this.oscillators[note] !== undefined)
            return;

        frequency = this.audioConfiguration.currentScale.frequencies[note];

        var oscillator: OscillatorNode = this.CreateOscillator(frequency);
        oscillator.start();

        this.oscillators[note] = oscillator;
    }

    NoteOff = (note: number) => {
        
        if (note === -1 || this.oscillators[note] === undefined)
            return;

        var oscillator: OscillatorNode = this.oscillators[note];
        oscillator.stop();

        this.oscillators[note] = undefined;
    }
}
