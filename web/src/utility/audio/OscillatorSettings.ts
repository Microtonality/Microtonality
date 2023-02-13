export class OscillatorSettings {
    pitchRatio: number
    localGain: number

    waveType: OscillatorType

    constructor(pitchRatio: number, localGain: number, waveType: OscillatorType) {
        this.pitchRatio = pitchRatio
        this.localGain = localGain

        this.waveType = waveType
    }
}