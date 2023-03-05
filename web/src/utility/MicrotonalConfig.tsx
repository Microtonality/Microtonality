import {Scale} from "./microtonal/Scale";
import {generateEqualTemperedScale} from "./microtonal/ScaleGeneration";
import OscillatorSettings from "./audio/OscillatorSettings";
import {createPianoKeyboardShortcuts, mapScaleToKeyboardShortcuts} from "./microtonal/PianoKeyMapping";

export interface MicrotonalConfig {
    keyMapping?: Record<number, number>; // Map keyboard keys (0-keysPerOctave) to scale degrees, ex. 0: 1
    scaleConfig?: ScaleConfig;
    synthConfig?: SynthConfig;
}

export interface SynthConfig {
    gain?: number
    pitchBend?: number

    attack?: number
    decay?: number
    sustain?: number
    release?: number

    oscillators?: Array<OscillatorSettings>
}

export interface ScaleConfig {
    keysPerOctave?: number; // How many piano keys are mapped per octave, 12 by default
    tuningFrequency?: number; // Anchor frequency of scale
    rootKey?: number; // Which MIDI key maps to the tuningFrequency. In normal 12-tone equal-temperament
    // western music, this is A4 == 440Hz. A4 is MIDI key 69.
    scale?: Scale // The configuration for the scale
}

export const DEFAULT_SYNTH_CONFIG: SynthConfig = {
    gain: 0.05,
    pitchBend: 0,

    attack: 1,
    decay: 1,
    sustain: 1,
    release: 1,

    oscillators: [
        new OscillatorSettings(1, 0.5, "sine"),
        new OscillatorSettings(2, 0.5, "sine"),
        new OscillatorSettings(3, 0.5, "sine"),
        new OscillatorSettings(4, 0.5, "sine"),
        new OscillatorSettings(5, 0.5, "sine"),
        new OscillatorSettings(6, 0.5, "sine"),
        new OscillatorSettings(7, 0.5, "sine"),
        ]
}

export const DEFAULT_SCALE_CONFIG: ScaleConfig = {
    keysPerOctave: 12,
    tuningFrequency: 440,
    rootKey: 69,
    scale: generateEqualTemperedScale(18)
}

export const DEFAULT_MICROTONAL_CONFIG: MicrotonalConfig = {
    keyMapping: mapScaleToKeyboardShortcuts(DEFAULT_SCALE_CONFIG.scale, DEFAULT_SCALE_CONFIG.keysPerOctave),
    scaleConfig: DEFAULT_SCALE_CONFIG,
    synthConfig: DEFAULT_SYNTH_CONFIG
}

const createMicrotonalConfig = (
    microtonalConfig?: MicrotonalConfig,
    synthConfig?: SynthConfig,
    scaleConfig?: ScaleConfig
) => {
    let newScaleConfig = {...DEFAULT_SCALE_CONFIG, ...scaleConfig} as ScaleConfig;
    let newSynthConfig = {...DEFAULT_SYNTH_CONFIG, ...synthConfig} as SynthConfig;
    return {
        ...DEFAULT_MICROTONAL_CONFIG,
        scaleConfig: newScaleConfig,
        synthConfig: newSynthConfig,
        ...microtonalConfig
    } as MicrotonalConfig;
}

export {createMicrotonalConfig};
