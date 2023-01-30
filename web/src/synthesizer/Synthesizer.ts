import { AudioConfiguration } from './AudioConfiguration';
import { MIDI_MIN, MIDI_MAX } from '../utility/midi/NoteToMidiConverter';
import FrequencyBar from './FrequencyBar';

// TODO: fix snapping by introducing a layer of gain nodes to each oscillator (wrapper object to hold both?)
export class Synthesizer {

    oscillators: Array<OscillatorNode>;
    audioConfiguration: AudioConfiguration;
    activeNotes: Array<number>;
    frequencyBar: FrequencyBar;

    constructor(freqBar: FrequencyBar) {
        this.oscillators = new Array<OscillatorNode>(MIDI_MAX + 1);
        this.audioConfiguration = new AudioConfiguration();
        this.activeNotes = new Array<number>();
        this.frequencyBar = freqBar
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

        let frequency: number = this.frequencyBar.octaves[this.audioConfiguration.currentOctave][this.frequencyBar.frequencyMappingsReverse.get(note % 12)] //this.audioConfiguration.currentScale.frequencies[note];
        console.log(frequency)

        if (frequency === undefined)
            return;

        var oscillator: OscillatorNode = this.CreateOscillator(frequency);
        oscillator.start();

        this.oscillators[note] = oscillator;
        this.activeNotes.push(note);
    }

    NoteOff = (note: number) => {

        if (this.oscillators[note] === undefined)
            return;

        var oscillator: OscillatorNode = this.oscillators[note];
        oscillator.stop();
        oscillator.disconnect();

        this.oscillators[note] = undefined;
        let index: number = this.activeNotes.indexOf(note, 0);
        if (index > -1) {
            this.activeNotes.splice(index, 1);
        }
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
                this.oscillators[i].disconnect();
                this.oscillators[i] = undefined;
            }
        }
    }

    OctaveUp(): void {
        this.ClearOscillators();
        this.activeNotes = [];
        this.audioConfiguration.OctaveUp();
    }

    OctaveDown(): void {
        this.ClearOscillators();
        this.activeNotes = [];
        this.audioConfiguration.OctaveDown();
    }
}
