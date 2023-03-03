import {SynthConfig, DEFAULT_SYNTH_CONFIG} from "../MicrotonalConfig";
import OscillatorStack from "./OscillatorStack";

export class AdditiveSynthesizer {
    config: SynthConfig = DEFAULT_SYNTH_CONFIG;

    oscillatorStacks: { [key: number]: OscillatorStack } = {}

    onPlayFrequency(frequency: number, velocity: number) {
        if (this.oscillatorStacks[frequency] != null) {
            return;
        }

        this.oscillatorStacks[frequency] = new OscillatorStack(
                this.config.oscillators,
                frequency,
                this.config.gain,
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