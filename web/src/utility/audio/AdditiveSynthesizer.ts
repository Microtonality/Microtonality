import {SynthConfig, DEFAULT_SYNTH_CONFIG} from "../MicrotonalConfig";
import OscillatorStack from "./OscillatorStack";

export class AdditiveSynthesizer {
    config: SynthConfig = DEFAULT_SYNTH_CONFIG;

    audioContext: AudioContext = new AudioContext()
    masterGain: GainNode = this.audioContext.createGain()
    dynamicsCompressor: DynamicsCompressorNode = this.audioContext.createDynamicsCompressor()

    oscillatorStacks: { [key: number]: OscillatorStack } = {}

    constructor() {
        // this.dynamicsCompressor.attack.value = 1
        // this.dynamicsCompressor.release.value = 1

        this.dynamicsCompressor.connect(this.masterGain)
        this.masterGain.connect(this.audioContext.destination)
    }

    updateSettings() {
        this.masterGain.gain.value = this.config.gain;
        console.log(this.config)
    }

    onPlayFrequency(frequency: number, velocity: number) {
        if (this.oscillatorStacks[frequency] != null) {
            return;
        }

        console.log(this.config.oscillators[0])

        this.oscillatorStacks[frequency] = new OscillatorStack(
                this.config.oscillators,
                frequency,
                this.config.gain,
                this.audioContext,
                this.dynamicsCompressor
                )

        this.oscillatorStacks[frequency].beginPlay()
    }

    onStopFrequency(frequency: number) {
        if (this.oscillatorStacks[frequency] == null) {
            return;
        }

        this.oscillatorStacks[frequency].endPlay()
        delete this.oscillatorStacks[frequency]
    }
}