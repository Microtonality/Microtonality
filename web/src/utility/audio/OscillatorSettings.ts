export default class OscillatorSettings {
    pitchRatio: number
    localGain: number
    waveType: OscillatorType

    constructor(pitchRatio: number, localGain: number, waveType: OscillatorType) {
        this.pitchRatio = pitchRatio
        this.localGain = localGain
        this.waveType = waveType
    }

    equals(other: OscillatorSettings): boolean {
        if (this.pitchRatio === other.pitchRatio &&
            this.localGain === other.localGain &&
            this.waveType === other.waveType) {
            return true;
        }

        return false;
    }
}