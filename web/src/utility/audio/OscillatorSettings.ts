
export interface OscillatorSettings {
    pitchRatio: number,
    localGain: number,
    waveType: OscillatorType,
}

export const DEFAULT_OSCILLATOR_SETTINGS: OscillatorSettings = {
    pitchRatio: 1,
    localGain: 0.5,
    waveType: "sine",
}
