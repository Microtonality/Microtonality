import {createMicrotonalConfig, MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import {OscillatorSettings} from "../../utility/audio/OscillatorSettings";
import { Scale } from "../../utility/microtonal/Scale";
import { ScaleNote } from "../../utility/microtonal/notes";
import { parsePitchValue } from "../../utility/microtonal/scala/ScalaParser";
import {mapScaleToKeyboardShortcuts} from "../../utility/microtonal/PianoKeyMapping";

export interface MicrotonalConfigHistory {
    previous: Array<MicrotonalConfig>,
    current: MicrotonalConfig,
    next: Array<MicrotonalConfig>
}

enum MCActions {
    UNDO_CONFIG,
    REDO_CONFIG,
    SET_CONFIG,
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
    | {type: MCActions.UNDO_CONFIG}
    | {type: MCActions.REDO_CONFIG}
    | {type: MCActions.SET_CONFIG, config: MicrotonalConfig}
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

const MicrotonalConfigReducer = (state: MicrotonalConfigHistory, action: Action): MicrotonalConfigHistory => {
    let newState = {...state};
    console.log({...action, theAction: MCActions[action.type]});
    if (action.type === MCActions.UNDO_CONFIG) {
        if (newState.previous.length !== 0) {
            newState.next.unshift(newState.current);
            newState.current = newState.previous.pop();
        }
    }
    if (action.type === MCActions.REDO_CONFIG) {
        if (newState.next.length !== 0) {
            newState.previous.push(newState.current);
            newState.current = newState.next.shift();
        }
    }

    let configChange: MicrotonalConfig;
    let config: MicrotonalConfig = newState.current;

    if (action.type === MCActions.SET_CONFIG) {
        configChange = action.config;
    }

    // Scale Changes
    if (action.type === MCActions.SET_SCALE) {
        configChange = {scaleConfig: {scale: action.scale}, keyMapping: mapScaleToKeyboardShortcuts(configChange.scaleConfig.scale, newState.current.scaleConfig.keysPerOctave)};
    }
    if (action.type === MCActions.ADD_NOTE ||
        action.type === MCActions.EDIT_NOTE ||
        action.type === MCActions.SWAP_NOTES ||
        action.type === MCActions.DELETE_NOTE) {

        let notes: ScaleNote[] = [...config.scaleConfig.scale.notes];

        if (action.type === MCActions.ADD_NOTE) {
            notes.push(action.note);
        }
        else if (action.type === MCActions.EDIT_NOTE) {
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

        configChange = {scaleConfig: {scale: {notes: notes}}};

        if (configChange.scaleConfig.scale.notes.length !== state.current.scaleConfig.scale.notes.length) {
            configChange.keyMapping = mapScaleToKeyboardShortcuts(configChange.scaleConfig.scale, newState.current.scaleConfig.keysPerOctave);
        }
    }
    if (action.type === MCActions.EDIT_OCTAVE_NOTE) {
        let octaveNote: ScaleNote = parsePitchValue(`${action.noteValue} ${config.scaleConfig.scale.octaveNote.comments}`);
        configChange = {scaleConfig: {scale: {octaveNote: octaveNote}}};
    }
    if (action.type === MCActions.SET_TUNING_FREQUENCY) {
        configChange = {scaleConfig: {tuningFrequency: action.tuningFrequency}};
    }

    // Synthesizer Changes
    if (action.type === MCActions.SET_OSCILLATOR) {
        let newOscillators = [...config.synthConfig.oscillators];
        newOscillators.splice(action.oscIndex, 1, action.osc);
        configChange = {synthConfig: {oscillators: newOscillators}};
    }
    if (action.type === MCActions.SET_ATTACK) {
        configChange = {synthConfig: {attack: action.attack}};
    }
    if (action.type === MCActions.SET_DECAY) {
        configChange = {synthConfig: {decay: action.decay}};
    }
    if (action.type === MCActions.SET_SUSTAIN) {
        configChange = {synthConfig: {sustain: action.sustain}};
    }
    if (action.type === MCActions.SET_RELEASE) {
        configChange = {synthConfig: {release: action.release}};
    }
    if (action.type === MCActions.SET_MASTER_GAIN) {
        configChange = {synthConfig: {gain: action.gain}};
    }

    if (commitChange(config, configChange, true) !== null) {
        newState.previous.push(newState.current);
        newState.current = commitChange(config, configChange);
        newState.next = [];
    }

    return newState;
}

const OBJECT_PROTOTYPE = Object.getPrototypeOf({});

const commitChange = (config: any, change: any, dryRun = false) => {
    let hasChanged = false;
    let newConfig = config;
    for (let key in change) {
        if (Object.getPrototypeOf(change[key]) === OBJECT_PROTOTYPE) {
            let result = commitChange(newConfig[key], change[key]);
            if (result !== null) {
                hasChanged = true;
                if (!dryRun) {
                    newConfig = {...newConfig, [key]: result};
                }
            }
        } else if (newConfig[key] !== change[key]) {
            if (!dryRun) {
                newConfig = {...newConfig, [key]: change[key]};
            }
            hasChanged = true;
        }
    }

    if (hasChanged) {
        return newConfig;
    }

    return null;
}

export {MicrotonalConfigReducer, MCActions}
