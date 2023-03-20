import {OscillatorSettings} from "./OscillatorSettings";

export default class OscillatorStack {

    oscillatorNodes: Array<OscillatorNode> = []
    gainNodes: Array<GainNode> = []

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
            this.gainNodes[i].gain.value = oscillatorSettings[i].localGain

            this.oscillatorNodes[i].connect(this.gainNodes[i])
            this.gainNodes[i].connect(dynamicsCompressor)
        }
    }

    beginPlay() {
        this.oscillatorNodes.forEach(function (oscillator) {
            oscillator.start(0)
        })
    }

    async endPlay(audioContext: AudioContext, release: number) {
        this.gainNodes.forEach(function (gain) {
            gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + (release))
        })

        await new Promise(f => setTimeout(f, release * 2000));

        this.oscillatorNodes.forEach(function (oscillator) {
            oscillator.stop(1)
        })
    }
}