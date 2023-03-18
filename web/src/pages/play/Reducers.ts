import {createMicrotonalConfig, MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import {OscillatorSettings} from "../../utility/audio/OscillatorSettings";
import { Scale } from "../../utility/microtonal/Scale";
import { ScaleNote } from "../../utility/microtonal/notes";
import { parsePitchValue } from "../../utility/microtonal/scala/ScalaParser";

enum MCActions {
    SET_MICROTONAL_CONFIG,
    SET_SCALE,
    ADD_NOTE,
    EDIT_NOTE,
    SWAP_NOTES,
    DELETE_NOTE,
    EDIT_OCTAVE_NOTE,
    SET_TUNING_FREQUENCY,
    SET_OSCILLATOR,
    SET_ATTACK,
    SET_DECAY,
    SET_SUSTAIN,
    SET_RELEASE,
    SET_MASTER_GAIN
}

type Action =
    | {type: MCActions.SET_MICROTONAL_CONFIG, microtonalConfig: MicrotonalConfig}
    | {type: MCActions.SET_SCALE, scale: Scale}
    | {type: MCActions.ADD_NOTE, note: ScaleNote}
    | {type: MCActions.EDIT_NOTE, noteValue: string, noteIndex: number}
    | {type: MCActions.SWAP_NOTES, currentIndex: number, newIndex: number}
    | {type: MCActions.DELETE_NOTE, noteIndex: number}
    | {type: MCActions.EDIT_OCTAVE_NOTE, noteValue: string}
    | {type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: number}
    | {type: MCActions.SET_OSCILLATOR, osc: OscillatorSettings, oscIndex: number}
    | {type: MCActions.SET_ATTACK, attack: number}
    | {type: MCActions.SET_DECAY, decay: number}
    | {type: MCActions.SET_SUSTAIN, sustain: number}
    | {type: MCActions.SET_RELEASE, release: number}
    | {type: MCActions.SET_MASTER_GAIN, gain: number}

const MicrotonalConfigReducer = (state: MicrotonalConfig, action: Action): MicrotonalConfig => {

    // Config swaps
    if (action.type === MCActions.SET_MICROTONAL_CONFIG) {
        // is this comparison safe?
        if (action.microtonalConfig === state)
            return state;

        return createMicrotonalConfig(action.microtonalConfig, null, null);
    }

    // Scale Changes
    if (action.type === MCActions.SET_SCALE) {
        if (action.scale.equals(state.scaleConfig.scale))
            return state;

        let scaleConfig = {...state.scaleConfig, scale: action.scale, keysPerOctave: action.scale.notes.length} as ScaleConfig;
        return createMicrotonalConfig(state, null, scaleConfig);
    }
    if (action.type === MCActions.ADD_NOTE ||
        action.type === MCActions.EDIT_NOTE ||
        action.type === MCActions.SWAP_NOTES ||
        action.type === MCActions.DELETE_NOTE) {

        let notes: ScaleNote[] = state.scaleConfig.scale.notes;

        if (action.type === MCActions.ADD_NOTE) {
            notes = [...notes, action.note];
        }
        else if (action.type === MCActions.EDIT_NOTE) {
            if (action.noteValue === notes[action.noteIndex].num)
                return state;

            let note: ScaleNote = parsePitchValue(`${action.noteValue} ${notes[action.noteIndex].comments}`);
            notes.splice(action.noteIndex, 1, note);
        }
        else if (action.type === MCActions.SWAP_NOTES) {
            let note: ScaleNote = notes[action.currentIndex];
            let swapWith: ScaleNote = notes[action.newIndex];

            notes.splice(action.newIndex, 1, note);
            notes.splice(action.currentIndex, 1, swapWith);
        }
        else if (action.type === MCActions.DELETE_NOTE) {
            notes.splice(action.noteIndex, 1);
        }

        let scale: Scale = new Scale(notes, state.scaleConfig.scale.title, state.scaleConfig.scale.description, state.scaleConfig.scale.octaveNote);
        let scaleConfig = {...state.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
        return createMicrotonalConfig(state, null, scaleConfig);
    }
    if (action.type === MCActions.EDIT_OCTAVE_NOTE) {
        if (action.noteValue === state.scaleConfig.scale.octaveNote.num)
            return state;

        let octaveNote: ScaleNote = parsePitchValue(`${action.noteValue} ${state.scaleConfig.scale.octaveNote.comments}`);
        let scale = new Scale(state.scaleConfig.scale.notes, state.scaleConfig.scale.title, state.scaleConfig.scale.description, octaveNote);
        let scaleConfig = {...state.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
        return createMicrotonalConfig(state, null, scaleConfig);
    }
    if (action.type === MCActions.SET_TUNING_FREQUENCY) {
        if (action.tuningFrequency === state.scaleConfig.tuningFrequency)
            return state;

        let scaleConfig = {...state.scaleConfig, tuningFrequency: action.tuningFrequency} as ScaleConfig;
        return createMicrotonalConfig(state, null, scaleConfig);
    }

    // Synthesizer Changes
    if (action.type === MCActions.SET_OSCILLATOR) {
        let oldOsc: OscillatorSettings = state.synthConfig.oscillators[action.oscIndex];
        let newOsc: OscillatorSettings = action.osc;
        if (newOsc.pitchRatio === oldOsc.pitchRatio &&
            newOsc.localGain === oldOsc.localGain &&
            newOsc.waveType === oldOsc.waveType) {
            return state;
        }

        let newOscillators = [...state.synthConfig.oscillators];
        newOscillators.splice(action.oscIndex, 1, newOsc);
        let synthConfig = {...state.synthConfig, oscillators: newOscillators} as SynthConfig;
        return createMicrotonalConfig(state, synthConfig, null);
    }
    if (action.type === MCActions.SET_ATTACK) {
        if (action.attack === state.synthConfig.attack)
            return state;

        let synthConfig = {...state.synthConfig, attack: action.attack} as SynthConfig;
        return createMicrotonalConfig(state, synthConfig, null);
    }
    if (action.type === MCActions.SET_DECAY) {
        if (action.decay === state.synthConfig.decay)
            return state;

        let synthConfig = {...state.synthConfig, decay: action.decay} as SynthConfig;
        return createMicrotonalConfig(state, synthConfig, null);
    }
    if (action.type === MCActions.SET_SUSTAIN) {
        if (action.sustain === state.synthConfig.sustain)
            return state;

        let synthConfig = {...state.synthConfig, sustain: action.sustain} as SynthConfig;
        return createMicrotonalConfig(state, synthConfig, null);
    }
    if (action.type === MCActions.SET_RELEASE) {
        if (action.release === state.synthConfig.release)
            return state;

        let synthConfig = {...state.synthConfig, release: action.release} as SynthConfig;
        return createMicrotonalConfig(state, synthConfig, null);
    }
    if (action.type === MCActions.SET_MASTER_GAIN) {
        if (action.gain === state.synthConfig.gain)
            return state;

        let synthConfig = {...state.synthConfig, gain: action.gain} as SynthConfig;
        return createMicrotonalConfig(state, synthConfig, null);
    }
}

export {MicrotonalConfigReducer, MCActions}
