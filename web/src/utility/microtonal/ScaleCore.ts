export class ScaleCore {
    public tuningFrequency: number;
    public keysPerOctave: number;
    public multipliers: number[];
    public rootKey: number;
    public keyMapping: {};
    constructor() {
        // This might be referenced as baseFrequency in the docs, but tuning frequency is probably more
        // commonly used in the field.
        this.tuningFrequency = 440;
        // This is how many keys are used per octave. By default, this is
        // 12 as standard MIDI keyboards are designed with 12 keys per octave in mind.
        this.keysPerOctave = 12;
        // This is the key that we bind the tuning frequency too. In normal 12-tone equal-temperament
        // western music, this is A4 == 440Hz. A4 is MIDI key 69.
        this.rootKey = 69
        // This is the array of multipliers we received from the Scala file loader.
        // These default multipliers correspond to the 12-tone equal temperament scale.
        this.multipliers = this.generateEqualTemperamentMultipliers(this.keysPerOctave);
        // Mapping from key to note multiplier. Key is given as a positive offset from the
        this.keyMapping = {}
    }

    // Generates an array of multipliers in the given equal temperament scale.
    // Multipliers should not be generated here, they should be part of the whatever manages the
    // configured scale and converts it to multipliers. This is mostly for defaults and testing.
    private generateEqualTemperamentMultipliers(numOfTones: number): number[] {
        let multipliers = [];
        for (let i=0; i<numOfTones; i++) {
            multipliers.push((440 * Math.pow(2, i/12)) / 440);
        }
        return multipliers;
    }

    // Use this to set the multiplier array to a new scale.
    setMultipliers(newMultipliers: number[]) {
        this.multipliers = newMultipliers;
    }

    // Given the current settings, convert a given MIDI Note number into a frequency.
    MIDINotesToFrequency(MIDINote: number): number {
        // First, we need to determine which key in the octave this is.
        let octaveKey = (MIDINote - this.rootKey) % this.keysPerOctave;
        if (octaveKey < 0) {
            octaveKey += this.keysPerOctave;
        }
        // Now, determine how many octaves away we are.
        let octaveOffset = Math.floor((MIDINote - this.rootKey) / this.keysPerOctave);

        // Which multiplier is this key mapped to?
        let multiplier;
        try {
            multiplier = this.multipliers[octaveKey];
        } catch (e) {
            console.log(`Error: key in octave ${octaveKey} (MIDI number: ${MIDINote}) is not assigned to a note in the scale.`)
            throw e;
        }

        // Finally, convert to a frequency.
        let noteFrequency = multiplier * this.tuningFrequency * Math.pow(2, octaveOffset);

        console.log(octaveKey, octaveOffset, noteFrequency);
        return noteFrequency;
    }

}

export default ScaleCore;
