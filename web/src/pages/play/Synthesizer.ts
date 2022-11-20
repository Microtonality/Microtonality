import { AudioConfiguration } from './AudioConfiguration';
import { MIDI_MIN, MIDI_MAX } from '../../utility/midi/NoteToMidiConverter';

export class Synthesizer {

    oscillators: Array<OscillatorNode>;
    audioConfiguration: AudioConfiguration;

    constructor() {
        this.oscillators = new Array<OscillatorNode>(MIDI_MAX + 1);
        this.audioConfiguration = new AudioConfiguration();
    }

    CreateOscillator(frequency: number): OscillatorNode {

        if (this.audioConfiguration.audioContext === undefined) {
            this.audioConfiguration.InitializeContextAndNodes();
        }

        var oscillator: OscillatorNode;
        oscillator = new OscillatorNode(this.audioConfiguration.audioContext);
        oscillator.frequency.value = frequency;

        this.audioConfiguration.Connect(oscillator);

        return oscillator;
    }

    // Takes in a MIDI number input and starts a new oscillator
    NoteOn = (note: number) => {

        if (this.oscillators[note] !== undefined)
            return;

        let frequency: number = this.audioConfiguration.currentScale.frequencies[note];

        if (frequency === undefined)
            return;

        var oscillator: OscillatorNode = this.CreateOscillator(frequency);
        oscillator.start();

        this.oscillators[note] = oscillator;
    }

    NoteOff = (note: number) => {

        if (this.oscillators[note] === undefined)
            return;

        var oscillator: OscillatorNode = this.oscillators[note];
        oscillator.stop();

        this.oscillators[note] = undefined;
    }

    UpdateVolume = (volume: number) => {
        this.audioConfiguration.UpdateVolume(volume);
    }

    ClearOscillators(): void {

        let i: number;
        for (i = MIDI_MIN; i <= MIDI_MAX; i++)
        {
            if (this.oscillators[i] !== undefined)
            {
                this.oscillators[i].stop();
                this.oscillators[i] = undefined;
            }
        }
    }

    OctaveUp(): void {
        this.ClearOscillators();
        this.audioConfiguration.OctaveUp();
    }

    OctaveDown(): void {
        this.ClearOscillators();
        this.audioConfiguration.OctaveDown();
    }
}
