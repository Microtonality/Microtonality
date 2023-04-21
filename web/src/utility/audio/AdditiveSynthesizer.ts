import {SynthConfig, DEFAULT_SYNTH_CONFIG} from "../MicrotonalConfig";
import OscillatorStack from "./OscillatorStack";

/**
 * Manages the creation of audio within the application.
 * Creates a stack of oscillators when playing a new note.
 * Oscillator stacks are mapped to the frequency they were
 * played at in a dictionary.
 *
 * The audio context, master gain and dynamics compressor
 * are a part of the Web Audio API that all oscillators
 * transmit information to in order to generate sound.
 */
export class AdditiveSynthesizer {
    config: SynthConfig = DEFAULT_SYNTH_CONFIG;

    /** Controls sound generation and connects to every oscillator */
    audioContext: AudioContext = new AudioContext()
    /** Controls the volume of the sounds generated globally. Linked to the main gain knob */
    masterGain: GainNode = this.audioContext.createGain()
    /** Controls the sound to prevent it from peaking & creating harsh clipping */
    dynamicsCompressor: DynamicsCompressorNode = this.audioContext.createDynamicsCompressor()

    /** Dictinoary holding oscillator stacks whose key is the base frequency being played */
    oscillatorStacks: { [key: number]: OscillatorStack } = {}

    constructor() {
        this.dynamicsCompressor.connect(this.masterGain)
        this.masterGain.connect(this.audioContext.destination)
    }

    /** Called whenever the synth config is updated. Updates master gain & stops all current oscillators. */
    updateSettings() {
        this.masterGain.gain.value = this.config.gain
        this.clearOscillators()
    }

    /** Stops all current oscillators and removes them from the dictionary. */
    clearOscillators() {
        for (let frequency in this.oscillatorStacks) {
            this.oscillatorStacks[frequency].endPlay(this.audioContext, this.config.release)
            delete this.oscillatorStacks[frequency]
        }
    }

    /**
     * Creates a new oscillator stack at the frequency being played.
     * @param {number} frequency - The base frequency of the stack.
     * @param {number} velocity - The intensity of the note. Not yet implemented.
     */
    onPlayFrequency(frequency: number, velocity: number) {
        if (this.oscillatorStacks[frequency] != null) {
            return;
        }

        this.oscillatorStacks[frequency] = new OscillatorStack(
                this.config.oscillators,
                frequency,
                this.config.gain,
                this.audioContext,
                this.dynamicsCompressor
                )

        this.oscillatorStacks[frequency].beginPlay(this.audioContext, this.config)
    }

    /**
     * Stops an oscillator stack & removes it from the dictinary
     * @param {number} frequency - The base frequency of the stack being removed.
     */
    onStopFrequency(frequency: number) {
        if (this.oscillatorStacks[frequency] == null) {
            return;
        }

        this.oscillatorStacks[frequency].endPlay(this.audioContext, this.config.release)
        delete this.oscillatorStacks[frequency]
    }
}