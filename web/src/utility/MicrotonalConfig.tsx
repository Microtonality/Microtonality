import {Scale} from "./microtonal/Scale";

interface MicrotonalConfig {
    keyMapping?: Record<string, string>; // Map Keyboard keys to scale degrees, ex. "a": 0
    scaleConfig?: ScaleConfig;
    synthConfig?: SynthConfig;

}

interface SynthConfig {

}

interface ScaleConfig {
    keysPerOctave?: number; // How many piano keys are mapped per octave, 12 by default
    tuningFrequency?: number; // Anchor frequency of scale
    rootKey?: number; // Which MIDI key maps to the tuningFrequency. In normal 12-tone equal-temperament
    // western music, this is A4 == 440Hz. A4 is MIDI key 69.
    scale?: Scale // The configuration for the scale
}

const DEFAULT_MICROTONAL_SETTINGS: MicrotonalConfig = {

}

const DEFAULT_SYNTH_SETTINGS: MicrotonalConfig = {

}

const DEFAULT_SCALE_SETTINGS: ScaleConfig = {
    keysPerOctave: 12,
    tuningFrequency: 440,
    rootKey: 69,
    scale: Scale
}


const createMicrotonalConfig = (
    microtonalConfig?: MicrotonalConfig,
    synthConfig?: MicrotonalConfig,
    scaleConfig?: ScaleConfig
) => {

}

