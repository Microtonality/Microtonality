import { SynthConfig } from "../MicrotonalConfig";
import {OscillatorSettings} from "./OscillatorSettings";

export default class OscillatorStack {

    oscillatorNodes: Array<OscillatorNode> = []
    gainNodes: Array<GainNode> = []
    endingPlay: boolean = false

    constructor(
            oscillatorSettings: Array<OscillatorSettings>,
            frequency: number,
            baseVolume: number,
            audioContext: AudioContext,
            dynamicsCompressor: DynamicsCompressorNode
            ) {
        for (let i = 0; i < oscillatorSettings.length; i++) {
            this.oscillatorNodes[i] = audioContext.createOscillator()
            this.oscillatorNodes[i].frequency.setValueAtTime(
                    oscillatorSettings[i].pitchRatio * frequency,
                    audioContext.currentTime,
                    )

            this.oscillatorNodes[i].type = oscillatorSettings[i].waveType;

            this.gainNodes[i] = audioContext.createGain()
            this.gainNodes[i].gain.value = 0

            this.oscillatorNodes[i].connect(this.gainNodes[i])
            this.gainNodes[i].connect(dynamicsCompressor)
        }
    }

    async beginPlay(audioContext: AudioContext, config: SynthConfig) {
        for (let i = 0; i < this.oscillatorNodes.length; i++) {
            this.oscillatorNodes[i].start(0)
            this.gainNodes[i].gain.linearRampToValueAtTime(
                    config.oscillators[i].localGain,
                    audioContext.currentTime + (config.attack))
        }

        await new Promise(f => setTimeout(f, config.attack * 1000))

        if (!this.endingPlay) {
            for (let i = 0; i < this.oscillatorNodes.length; i++) {
                this.gainNodes[i].gain.linearRampToValueAtTime(
                        config.sustain * config.oscillators[i].localGain,
                        audioContext.currentTime + (config.decay))
            }
        }
    }

    async endPlay(audioContext: AudioContext, release: number) {
        this.endingPlay = true

        this.gainNodes.forEach(function (gain) {
            gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + (release))
        })

        await new Promise(f => setTimeout(f, release * 1000))

        this.oscillatorNodes.forEach(function (oscillator) {
            oscillator.stop(1)
        })
    }
}