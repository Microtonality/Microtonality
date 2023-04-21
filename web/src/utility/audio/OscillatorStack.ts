import { SynthConfig } from "../MicrotonalConfig";
import {OscillatorSettings} from "./OscillatorSettings";

export default class OscillatorStack {

    oscillatorNodes: Array<OscillatorNode> = []
    gainNodes: Array<GainNode> = []
    endingPlay: boolean = false
    stopped: boolean = false

    constructor(
            oscillatorSettings: Array<OscillatorSettings>,
            frequency: number,
            baseVolume: number,
            audioContext: AudioContext,
            dynamicsCompressor: DynamicsCompressorNode
            ) {
        for (let i = 0; i < oscillatorSettings.length; i++) {
            this.oscillatorNodes[i] = audioContext.createOscillator()
            // Set oscillator frequency relative to the base frequency
            this.oscillatorNodes[i].frequency.setValueAtTime(
                    oscillatorSettings[i].pitchRatio * frequency,
                    audioContext.currentTime,
                    )

            this.oscillatorNodes[i].type = oscillatorSettings[i].waveType;

            // Create local gain for this oscillator & make it silent
            this.gainNodes[i] = audioContext.createGain()
            this.gainNodes[i].gain.value = 0

            // Connect the gain nodes to the oscillators & then to the compressor.
            this.oscillatorNodes[i].connect(this.gainNodes[i])
            this.gainNodes[i].connect(dynamicsCompressor)
        }
    }

    /**
     * Begins sound generation for the given stack.
     */
    async beginPlay(audioContext: AudioContext, config: SynthConfig) {
        // Start sound & ramp to max volume for each oscillator
        for (let i = 0; i < this.oscillatorNodes.length; i++) {
            this.oscillatorNodes[i].start(0)
            this.gainNodes[i].gain.setValueAtTime(0, 0)
            this.gainNodes[i].gain.linearRampToValueAtTime(
                    config.oscillators[i].localGain,
                    audioContext.currentTime + (config.attack))
        }

        // Wait until attack time period is done
        await new Promise(f => setTimeout(f, config.attack * 1001))

        // If the user hasn't released the note, ramp down to the sustain level.
        if (!this.endingPlay) {
            for (let i = 0; i < this.oscillatorNodes.length; i++) {
                this.gainNodes[i].gain.linearRampToValueAtTime(
                        config.sustain * config.oscillators[i].localGain,
                        audioContext.currentTime + (config.decay))
            }
        }
    }

    /**
     * Begins release envelope & ends sound generation for the given stack.
     */
    async endPlay(audioContext: AudioContext, release: number) {
        // Flag so note doesn't sustain when ending.
        this.endingPlay = true

        // Ramp down to silence
        this.gainNodes.forEach(function (gain) {
            // Force the note to the exact volume it should be before ramping down. Prevents weird audio bugs.
            gain.gain.linearRampToValueAtTime(gain.gain.value, audioContext.currentTime + 0.001)
            gain.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + (release))
        })

        // Wait until release time interval is done
        await new Promise(f => setTimeout(f, release * 1000))

        this.stopped = true

        // Stop all oscillators
        this.oscillatorNodes.forEach(function (oscillator) {
            oscillator.stop(1)
        })
    }
}