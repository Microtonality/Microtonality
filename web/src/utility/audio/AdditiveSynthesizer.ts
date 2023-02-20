import {SynthConfig, DEFAULT_SYNTH_SETTINGS} from "../MicrotonalConfig";

export class AdditiveSynthesizer {
    config: SynthConfig = DEFAULT_SYNTH_SETTINGS;

    oscillatorStacks: { [key: number]: OscillatorStack } = {}

    onPlayFrequency(frequency: number, velocity: number) {
        this.oscillatorStacks[frequency] = new OscillatorStack(
                this.config.oscillators,
                frequency,
                velocity,
                )

        this.oscillatorStacks[frequency].beginPlay()
    }

    onStopFrequency(frequency: number) {
        this.oscillatorStacks[frequency].endPlay()
        delete this.oscillatorStacks[frequency]
    }


}