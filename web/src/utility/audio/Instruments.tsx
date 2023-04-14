import {SynthConfig} from "../MicrotonalConfig";
import {OscillatorSettings, DEFAULT_OSCILLATOR_SETTINGS} from "./OscillatorSettings";

export const BASIC_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
        ]
}

export const PIANO_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.01,
    decay: 0.1,
    sustain: 0.4,
    release: 0.3,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "triangle", localGain: 0.67} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "triangle", localGain: 0.32} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "sine", localGain: 0.18} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "sine", localGain: 0.08} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "triangle", localGain: 0.04} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "sine", localGain: 0.02} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, waveType: "sawtooth", localGain: 0.01} as OscillatorSettings,
        ]
}

export const FLUTE_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.2,
    decay: 1,
    sustain: 1,
    release: 0.2,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "triangle", localGain: 0.83} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "sine", localGain: 0.15} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "triangle", localGain: 0.17} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "sine", localGain: 0.1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "triangle", localGain: 0.01} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "sine", localGain: 0.06} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, localGain: 0.0} as OscillatorSettings,
        ]
}

export const OBOE_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.3,
    decay: 1,
    sustain: 0.3,
    release: 1,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
        ]
}

export const CLARINET_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.08,
    decay: 0.1,
    sustain: 0.4,
    release: 0.3,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "sine", localGain: 0.5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "triangle", localGain: 0.13} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "sine", localGain: 0.5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "triangle", localGain: 0.15} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "sine", localGain: 0.5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "triangle", localGain: 0.17} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, waveType: "sine", localGain: 0.5} as OscillatorSettings,
        ]
}

export const BASSOON_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 1,
    decay: 1,
    sustain: 1,
    release: 1,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
        ]
}

export const TRUMPET_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.44,
    decay: 0.44,
    sustain: 0.29,
    release: 0.16,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "sine", localGain: 0.67} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "sine", localGain: 0.82} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "sine", localGain: 0.5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "sine", localGain: 0.27} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "sine", localGain: 0.37} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "sine", localGain: 0.12} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, waveType: "sawtooth", localGain: 0.09} as OscillatorSettings,
        ]
}

export const FRENCH_HORN_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 1,
    decay: 1,
    sustain: 1,
    release: 1,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
        ]
}

export const TROMBONE_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 1,
    decay: 1,
    sustain: 1,
    release: 1,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
        ]
}

export const TUBA_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.13,
    decay: 0.14,
    sustain: 0.31,
    release: 0.43,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "sawtooth", localGain: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "triangle", localGain: 0.75} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "triangle", localGain: 0.3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "sine", localGain: 0.37} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "sine", localGain: 0.43} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "sine", localGain: 0.46} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, waveType: "sine", localGain: 0.08} as OscillatorSettings,
        ]
}

export const VIOLIN_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.43,
    decay: 1.0,
    sustain: 1.0,
    release: 0.19,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "square", localGain: 0.45} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "sine", localGain: 0.5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "square", localGain: 0.42} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "sawtooth", localGain: 0.5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "sine", localGain: 0.43} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "sawtooth", localGain: 0.34} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, waveType: "sine", localGain: 0.47} as OscillatorSettings,
        ]
}

export const CELLO_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 1,
    decay: 1,
    sustain: 1,
    release: 1,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
        ]
}