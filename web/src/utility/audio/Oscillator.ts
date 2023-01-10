class Oscillator {
    constructor(pitchRatio: number, localGain: number) {
        this.pitchRatio = pitchRatio
        this.localGain = localGain
    }

    audioContext: AudioContext = new AudioContext()
    oscillatorNode: OscillatorNode = this.audioContext.createOscillator()
    gainNode: GainNode = this.audioContext.createGain()

    pitchRatio: number
    localGain: number

    setWaveType(waveType: OscillatorType) {
        this.oscillatorNode.type = waveType
    }

    setGain(gain: number) {
        this.localGain = gain
    }

    beginPlay(frequency: number, baseVolume: number) {
        this.gainNode.gain.value = this.localGain + baseVolume
        this.oscillatorNode.frequency.setValueAtTime(frequency * this.pitchRatio, this.audioContext.currentTime)
        this.oscillatorNode.start()
    }

    endPlay(frequency: number) {
        this.oscillatorNode.stop()
    }
}