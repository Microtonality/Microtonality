import {SynthConfig} from "../MicrotonalConfig";
import {OscillatorSettings, DEFAULT_OSCILLATOR_SETTINGS} from "./OscillatorSettings";

export const PIANO_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.1,
    decay: 0.1,
    sustain: 0.3,
    release: 0.4,

    oscillators: [
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1, waveType: "sine", localGain: 0.67} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2, waveType: "sine", localGain: 0.32} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3, waveType: "sawtooth", localGain: 0.18} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4, waveType: "sine", localGain: 0.08} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5, waveType: "square", localGain: 0.04} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6, waveType: "sine", localGain: 0.02} as OscillatorSettings,
        {...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7, waveType: "sawtooth", localGain: 0.01} as OscillatorSettings,
        ]
}

export const FLUTE_SYNTH: SynthConfig = {
    gain: 0.45,
    pitchBend: 0,

    attack: 0.2,
    decay: 1,
    sustain: 0.2,
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

export const VIOLIN_SYNTH: SynthConfig = {
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