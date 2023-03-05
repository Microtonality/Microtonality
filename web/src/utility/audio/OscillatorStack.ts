import OscillatorSettings from "./OscillatorSettings";

export default class OscillatorStack {

    audioContext: AudioContext
    dynamics: DynamicsCompressorNode
    oscillatorNodes: Array<OscillatorNode> = []
    gainNodes: Array<GainNode> = []

    masterGain: GainNode

    constructor(
            oscillatorSettings: Array<OscillatorSettings>,
            frequency: number,
            baseVolume: number
            ) {
        this.audioContext = new AudioContext()
        this.masterGain = this.audioContext.createGain()
        this.masterGain.gain.value = baseVolume
        this.dynamics = this.audioContext.createDynamicsCompressor();
        for (let i = 0; i < oscillatorSettings.length; i++) {
            this.oscillatorNodes[i] = this.audioContext.createOscillator()
            this.oscillatorNodes[i].frequency.setValueAtTime(
                    oscillatorSettings[i].pitchRatio * frequency,
                    this.audioContext.currentTime,
                    )

            this.oscillatorNodes[i].type = oscillatorSettings[i].waveType;

            this.gainNodes[i] = this.audioContext.createGain()
            this.gainNodes[i].gain.value = oscillatorSettings[i].localGain

            this.oscillatorNodes[i].connect(this.gainNodes[i])
            this.gainNodes[i].connect(this.dynamics)
        }

        this.dynamics.connect(this.masterGain)
        this.masterGain.connect(this.audioContext.destination);
    }

    beginPlay() {
        this.oscillatorNodes.forEach(function (oscillator) {
            oscillator.start()
        })
    }

    endPlay() {
        this.oscillatorNodes.forEach(function (oscillator) {
            oscillator.stop()
        })
    }
}