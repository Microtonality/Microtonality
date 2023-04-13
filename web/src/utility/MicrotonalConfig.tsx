import {Scale} from "./microtonal/Scale";
import {generateEqualTemperedScale} from "./microtonal/ScaleGeneration";
import {OscillatorSettings, DEFAULT_OSCILLATOR_SETTINGS} from "./audio/OscillatorSettings";
import {createPianoKeyboardShortcuts, mapScaleToKeyboardShortcuts} from "./microtonal/PianoKeyMapping";

export interface MicrotonalConfig {
    title?: string; // currently the title can only be changed by changing the file name itself
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
    gain: 0.30,
    pitchBend: 0,

    attack: 0.2,
    decay: 0.5,
    sustain: 0.4,
    release: 0.3,

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

export const DEFAULT_SCALE_CONFIG: ScaleConfig = {
    keysPerOctave: 12,
    tuningFrequency: 261.6255653005986,
    rootKey: 72,
    scale: generateEqualTemperedScale(12)
}

export const DEFAULT_MICROTONAL_CONFIG: MicrotonalConfig = {
    title: 'MicrotonalSynthConfig',
    keyMapping: mapScaleToKeyboardShortcuts(DEFAULT_SCALE_CONFIG.scale, DEFAULT_SCALE_CONFIG.keysPerOctave),
    scaleConfig: DEFAULT_SCALE_CONFIG,
    synthConfig: DEFAULT_SYNTH_CONFIG
}

const createMicrotonalConfig = (
    microtonalConfig?: MicrotonalConfig,
    synthConfig?: SynthConfig,
    scaleConfig?: ScaleConfig
) => {

    let newScaleConfig = {...DEFAULT_SCALE_CONFIG, ...microtonalConfig?.scaleConfig, ...scaleConfig} as ScaleConfig;
    let newSynthConfig = {...DEFAULT_SYNTH_CONFIG, ...microtonalConfig?.synthConfig, ...synthConfig} as SynthConfig;

    return {
        ...DEFAULT_MICROTONAL_CONFIG,
        ...microtonalConfig,
        scaleConfig: newScaleConfig,
        synthConfig: newSynthConfig
    } as MicrotonalConfig;
}

export {createMicrotonalConfig};
