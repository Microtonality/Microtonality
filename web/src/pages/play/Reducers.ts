import {createMicrotonalConfig, MicrotonalConfig, ScaleConfig, SynthConfig} from "../../utility/MicrotonalConfig";
import OscillatorSettings from "../../utility/audio/OscillatorSettings";
import { Scale } from "../../utility/microtonal/Scale";
import { ScaleNote } from "../../utility/microtonal/notes";
import { parsePitchValue } from "../../utility/microtonal/scala/ScalaParser";

const setScale = (microtonalConfig: MicrotonalConfig, scale: Scale) => {
    let scaleConfig = {...microtonalConfig.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const addNote = (microtonalConfig: MicrotonalConfig, note: ScaleNote) => {
    let notes: ScaleNote[] = [...microtonalConfig.scaleConfig.scale.notes, note];
    let scale = new Scale(notes, microtonalConfig.scaleConfig.scale.title, microtonalConfig.scaleConfig.scale.description, microtonalConfig.scaleConfig.scale.octaveNote);    
    let scaleConfig = {...microtonalConfig.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const deleteNote = (microtonalConfig: MicrotonalConfig, noteIndex: number) => {
    // Don't delete the 1/1 note
    if (noteIndex === 0)
        return;

    let notes = [...microtonalConfig.scaleConfig.scale.notes];
    notes.splice(noteIndex, 1);

    let scale = new Scale(notes, microtonalConfig.scaleConfig.scale.title, microtonalConfig.scaleConfig.scale.description, microtonalConfig.scaleConfig.scale.octaveNote);    
    let scaleConfig = {...microtonalConfig.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const swapNotes = (microtonalConfig: MicrotonalConfig, noteIndex: number, newIndex: number) => {
    let notes = [...microtonalConfig.scaleConfig.scale.notes];
    let note: ScaleNote = notes[noteIndex];
    let swapWith: ScaleNote = notes[newIndex];

    notes.splice(newIndex, 1, note);
    notes.splice(noteIndex, 1, swapWith);

    let scale = new Scale(notes, microtonalConfig.scaleConfig.scale.title, microtonalConfig.scaleConfig.scale.description, microtonalConfig.scaleConfig.scale.octaveNote);    
    let scaleConfig = {...microtonalConfig.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const editNote = (microtonalConfig: MicrotonalConfig, newValue: string, noteIndex: number) => {
    let notes = [...microtonalConfig.scaleConfig.scale.notes];
    let note: ScaleNote = parsePitchValue(`${newValue} ${notes[noteIndex].comments}`);
    notes.splice(noteIndex, 1, note);

    let scale = new Scale(notes, microtonalConfig.scaleConfig.scale.title, microtonalConfig.scaleConfig.scale.description, microtonalConfig.scaleConfig.scale.octaveNote);    
    let scaleConfig = {...microtonalConfig.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const editOctaveNote = (microtonalConfig: MicrotonalConfig, newValue: string) => {
    let octaveNote: ScaleNote = parsePitchValue(`${newValue} ${microtonalConfig.scaleConfig.scale.octaveNote.comments}`);
    let scale = new Scale(microtonalConfig.scaleConfig.scale.notes, microtonalConfig.scaleConfig.scale.title, microtonalConfig.scaleConfig.scale.description, octaveNote);    
    let scaleConfig = {...microtonalConfig.scaleConfig, scale: scale, keysPerOctave: scale.notes.length} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const setBaseFrequency = (microtonalConfig: MicrotonalConfig, baseFrequency: number) => {
    let scaleConfig = {...microtonalConfig.scaleConfig, tuningFrequency: baseFrequency} as ScaleConfig;
    return createMicrotonalConfig(microtonalConfig, null, scaleConfig);
}

const setOscillator = (microtonalConfig: MicrotonalConfig, oscillator: OscillatorSettings, oscIndex: number) => {
    let newOscillators = [...microtonalConfig.synthConfig.oscillators];
    newOscillators[oscIndex] = oscillator;
    let synthConfig = {...microtonalConfig.synthConfig, oscillators: newOscillators} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setAttack = (microtonalConfig: MicrotonalConfig, attack: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, attack: attack} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setDecay = (microtonalConfig: MicrotonalConfig, decay: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, decay: decay} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setSustain = (microtonalConfig: MicrotonalConfig, sustain: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, sustain: sustain} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setRelease = (microtonalConfig: MicrotonalConfig, release: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, release: release} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

const setGain = (microtonalConfig: MicrotonalConfig, gain: number) => {
    let synthConfig = {...microtonalConfig.synthConfig, gain: gain} as SynthConfig;
    return createMicrotonalConfig(microtonalConfig, synthConfig, null);
}

export {setScale, addNote, deleteNote, swapNotes, editNote, editOctaveNote, setBaseFrequency, setOscillator, setAttack, setDecay, setSustain, setRelease, setGain}
