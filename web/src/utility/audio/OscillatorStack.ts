class OscillatorStack {

    audioContexts: Array<AudioContext> = []
    oscillatorNodes: Array<OscillatorNode> = []
    gainNodes: Array<GainNode> = []

    constructor(
            oscillatorSettings: Array<OscillatorSettings>,
            frequency: number,
            baseVolume: number
            ) {
        for (let i = 0; i < oscillatorSettings.length; i++) {
            this.audioContexts[i] = new AudioContext()
            this.oscillatorNodes[i] = this.audioContexts[i].createOscillator()
            this.oscillatorNodes[i].frequency.setValueAtTime(
                    oscillatorSettings[i].pitchRatio * frequency,
                    this.audioContexts[i].currentTime,
                    )

            this.gainNodes[i] = this.audioContexts[i].createGain()
            this.gainNodes[i].gain.value = oscillatorSettings[i].localGain + baseVolume
        }
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