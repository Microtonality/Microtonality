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
        {waveType: "square", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 1} as OscillatorSettings,
        {waveType: "sine", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 2} as OscillatorSettings,
        {waveType: "sawtooth", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 3} as OscillatorSettings,
        {waveType: "sine", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 4} as OscillatorSettings,
        {waveType: "square", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 5} as OscillatorSettings,
        {waveType: "sine", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 6} as OscillatorSettings,
        {waveType: "sawtooth", ...DEFAULT_OSCILLATOR_SETTINGS, pitchRatio: 7} as OscillatorSettings,
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