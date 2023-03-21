import {SynthConfig, DEFAULT_SYNTH_CONFIG} from "../MicrotonalConfig";
import OscillatorStack from "./OscillatorStack";

export class AdditiveSynthesizer {
    config: SynthConfig = DEFAULT_SYNTH_CONFIG;

    audioContext: AudioContext = new AudioContext()
    masterGain: GainNode = this.audioContext.createGain()
    dynamicsCompressor: DynamicsCompressorNode = this.audioContext.createDynamicsCompressor()

    oscillatorStacks: { [key: number]: OscillatorStack } = {}

    constructor() {

        this.dynamicsCompressor.connect(this.masterGain)
        this.masterGain.connect(this.audioContext.destination)
    }

    updateSettings() {
        this.masterGain.gain.value = this.config.gain
        this.clearOscillators()
    }

    clearOscillators() {
        for (let frequency in this.oscillatorStacks) {
            this.oscillatorStacks[frequency].endPlay(this.audioContext, this.config.release)
            delete this.oscillatorStacks[frequency]
        }
    }

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

    onStopFrequency(frequency: number) {
        if (this.oscillatorStacks[frequency] == null) {
            return;
        }

        this.oscillatorStacks[frequency].endPlay(this.audioContext, this.config.release)
        delete this.oscillatorStacks[frequency]
    }
}