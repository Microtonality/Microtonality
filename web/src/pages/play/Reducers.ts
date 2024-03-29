import {MicrotonalConfig} from "../../utility/MicrotonalConfig";
import {OscillatorSettings} from "../../utility/audio/OscillatorSettings";
import {Scale} from "../../utility/microtonal/Scale";
import {ScaleNote} from "../../utility/microtonal/notes";
import {parsePitchValue} from "../../utility/microtonal/scala/ScalaParser";
import {mapScaleToKeyboardShortcuts} from "../../utility/microtonal/PianoKeyMapping";
import {convertNote} from "../../utility/microtonal/notes/ScaleNoteUtility";
import { v4 as UUIDv4 } from 'uuid';
import {BASIC_SYNTH, PIANO_SYNTH, FLUTE_SYNTH, OBOE_SYNTH, CLARINET_SYNTH,
    BASSOON_SYNTH, TRUMPET_SYNTH, FRENCH_HORN_SYNTH, TROMBONE_SYNTH, TUBA_SYNTH,
    VIOLIN_SYNTH, CELLO_SYNTH} from "../../utility/audio/Instruments";
import {rebuildScale} from "../../utility/microtonal/ScaleGeneration";

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
    SET_PRESET,
    ADD_NOTE,
    EDIT_NOTE,
    CONVERT_NOTE,
    DELETE_NOTE,
    EDIT_OCTAVE_NOTE,
    CONVERT_OCTAVE_NOTE,
    SET_TUNING_FREQUENCY,
    SET_OSCILLATOR,
    SET_ATTACK,
    SET_DECAY,
    SET_SUSTAIN,
    SET_RELEASE,
    SET_MASTER_GAIN,
    UNSET_KEYBIND,
    SET_KEYBIND,
}

type Action =
    | {type: MCActions.UNDO_CONFIG}
    | {type: MCActions.REDO_CONFIG}
    | {type: MCActions.SET_CONFIG, config: MicrotonalConfig}
    | {type: MCActions.SET_SCALE, scale: Scale}
    | {type: MCActions.ADD_NOTE, note: ScaleNote}
    | {type: MCActions.EDIT_NOTE, noteValue: string, noteIndex: number}
    | {type: MCActions.CONVERT_NOTE, noteIndex: number}
    | {type: MCActions.DELETE_NOTE, noteIndex: number}
    | {type: MCActions.EDIT_OCTAVE_NOTE, noteValue: string}
    | {type: MCActions.CONVERT_OCTAVE_NOTE}
    | {type: MCActions.SET_TUNING_FREQUENCY, tuningFrequency: number}
    | {type: MCActions.SET_OSCILLATOR, osc: OscillatorSettings, oscIndex: number}
    | {type: MCActions.SET_ATTACK, attack: number}
    | {type: MCActions.SET_DECAY, decay: number}
    | {type: MCActions.SET_SUSTAIN, sustain: number}
    | {type: MCActions.SET_RELEASE, release: number}
    | {type: MCActions.SET_MASTER_GAIN, gain: number}
    | {type: MCActions.UNSET_KEYBIND, keyIndex: number}
    | {type: MCActions.SET_KEYBIND, keyIndex: number, scaleDegree: number}
    | {type: MCActions.SET_PRESET, preset: string}

const MicrotonalConfigReducer = (state: MicrotonalConfigHistory, action: Action): MicrotonalConfigHistory => {

    console.log({...action, actionString: MCActions[action.type]});
    let newState: MicrotonalConfigHistory = {...state};

    if (action.type === MCActions.UNDO_CONFIG) {
        if (newState.previous.length !== 0) {
            newState.next.unshift(newState.current);
            newState.current = newState.previous.pop();
        }
    }
    else if (action.type === MCActions.REDO_CONFIG) {
        if (newState.next.length !== 0) {
            newState.previous.push(newState.current);
            newState.current = newState.next.shift();
        }
    }

    let configChange: MicrotonalConfig;
    let config: MicrotonalConfig = newState.current;

    if (action.type === MCActions.SET_CONFIG) {
        // Since this is called when a user uploads a JSON file,
        // we need to rebuild the scale to avoid losing the typing
        // for the notes.
        configChange = {...action.config, scaleConfig: {...action.config.scaleConfig, scale: rebuildScale(action.config.scaleConfig.scale)}};
    }

    // Scale Changes
    else if (action.type === MCActions.SET_SCALE) {
        configChange = {scaleConfig: {scale: action.scale}};
        configChange.keyMapping = mapScaleToKeyboardShortcuts(configChange.scaleConfig.scale, newState.current.scaleConfig.keysPerOctave);
    }
    else if (action.type === MCActions.ADD_NOTE ||
        action.type === MCActions.DELETE_NOTE ||
        action.type === MCActions.EDIT_NOTE ||
        action.type === MCActions.CONVERT_NOTE) {

        let notes: ScaleNote[] = [...config.scaleConfig.scale.notes];

        if (action.type === MCActions.ADD_NOTE) {
            notes.push(action.note);
        }
        else if (action.type === MCActions.DELETE_NOTE) {
            notes.splice(action.noteIndex, 1);
        }
        else if (action.type === MCActions.EDIT_NOTE ||
                 action.type === MCActions.CONVERT_NOTE) {

            let newNote: ScaleNote;
            if (action.type === MCActions.EDIT_NOTE) {
                newNote = parsePitchValue(`${action.noteValue} ${notes[action.noteIndex].comments}`);
            }
            else if (action.type === MCActions.CONVERT_NOTE) {
                let oldNote: ScaleNote = notes.at(action.noteIndex);
                newNote = convertNote(oldNote);
            }

            notes.splice(action.noteIndex, 1, newNote);
        }

        configChange = {scaleConfig: {scale: {notes: notes}}};

        if (configChange.scaleConfig.scale.notes.length !== state.current.scaleConfig.scale.notes.length) {
            configChange.keyMapping = mapScaleToKeyboardShortcuts(configChange.scaleConfig.scale, newState.current.scaleConfig.keysPerOctave);
        }
    }
    else if (action.type === MCActions.EDIT_OCTAVE_NOTE ||
        action.type === MCActions.CONVERT_OCTAVE_NOTE) {

        let oldOctaveNote: ScaleNote = config.scaleConfig.scale.octaveNote;
        let newOctaveNote: ScaleNote;
        switch (action.type) {
            case MCActions.EDIT_OCTAVE_NOTE:
                newOctaveNote = parsePitchValue(`${action.noteValue} ${oldOctaveNote.comments}`);
                break;

            case MCActions.CONVERT_OCTAVE_NOTE:
                newOctaveNote = convertNote(oldOctaveNote);
                break;
        }

        configChange = {scaleConfig: {scale: {octaveNote: newOctaveNote}}};
    }
    else if (action.type === MCActions.SET_TUNING_FREQUENCY) {
        configChange = {scaleConfig: {tuningFrequency: action.tuningFrequency}};
    }

    // Synthesizer Changes
    else if (action.type === MCActions.SET_OSCILLATOR) {
        let newOscillators = [...config.synthConfig.oscillators];
        newOscillators.splice(action.oscIndex, 1, action.osc);
        configChange = {synthConfig: {oscillators: newOscillators}};
    }
    else if (action.type === MCActions.SET_ATTACK) {
        configChange = {synthConfig: {attack: action.attack}};
    }
    else if (action.type === MCActions.SET_DECAY) {
        configChange = {synthConfig: {decay: action.decay}};
    }
    else if (action.type === MCActions.SET_SUSTAIN) {
        configChange = {synthConfig: {sustain: action.sustain}};
    }
    else if (action.type === MCActions.SET_RELEASE) {
        configChange = {synthConfig: {release: action.release}};
    }
    else if (action.type === MCActions.SET_MASTER_GAIN) {
        configChange = {synthConfig: {gain: action.gain}};
    }
    else if (action.type === MCActions.UNSET_KEYBIND) {
        configChange = {keyMapping: {[action.keyIndex]: null}}
    }
    else if (action.type === MCActions.SET_KEYBIND) {
        configChange = {keyMapping: {[action.keyIndex]: action.scaleDegree}}
    }
    else if (action.type === MCActions.SET_PRESET) {
        switch(action.preset) {
            case "Basic":
                configChange = {synthConfig: BASIC_SYNTH}
                break;
            case "Piano":
                configChange = {synthConfig: PIANO_SYNTH}
                break;
            case "Flute":
                configChange = {synthConfig: FLUTE_SYNTH}
                break;
            case "Oboe":
                configChange = {synthConfig: OBOE_SYNTH}
                break;
            case "Clarinet":
                configChange = {synthConfig: CLARINET_SYNTH}
                break;
            case "Bassoon":
                configChange = {synthConfig: BASSOON_SYNTH}
                break;
            case "Trumpet":
                configChange = {synthConfig: TRUMPET_SYNTH}
                break;
            case "French Horn":
                configChange = {synthConfig: FRENCH_HORN_SYNTH}
                break;
            case "Trombone":
                configChange = {synthConfig: TROMBONE_SYNTH}
                break;
            case "Tuba":
                configChange = {synthConfig: TUBA_SYNTH}
                break;
            case "Violin":
                configChange = {synthConfig: VIOLIN_SYNTH}
                break;
            case "Cello":
                configChange = {synthConfig: CELLO_SYNTH}
                break;
            default:
                break;
        }
    }

    if (commitChange(config, configChange, true) !== null) {
        newState.previous.push(newState.current);
        newState.current = {...commitChange(config, configChange), configId: UUIDv4()};
        newState.next = [];
    }

    return newState;
}

const OBJECT_PROTOTYPE = Object.getPrototypeOf({});

const commitChange = (config: any, change: any, dryRun = false) => {
    let hasChanged = false;
    let newConfig = config;
    for (let key in change) {
        // If this equals null, avoid checking its prototype
        if (change[key] === null) {
            if (newConfig[key] !== change[key]) {
                if (!dryRun) {
                    newConfig = {...newConfig, [key]: change[key]};
                }
                hasChanged = true;
            }
            continue;
        }

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
