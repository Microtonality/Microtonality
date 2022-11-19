import { MicrotonalScale } from "../../utility/microtonal/MicrotonalScale"

export class AudioConfiguration {
    currentScale: MicrotonalScale
    currentOctave: number
    maxOctave: number = 9;
    minOctave: number = -1;
    selectedNotes: Array<number>

    pitchBend: number
    pitchBendRange: number

    volume: number

    constructor() {
        this.currentScale = new MicrotonalScale();
        this.currentOctave = 3;
    }

    OctaveUp(): number {
        if (this.currentOctave < this.maxOctave)
            this.currentOctave++;
        
        return this.currentOctave;
    }

    OctaveDown(): number {
        if (this.currentOctave > this.minOctave)
            this.currentOctave--;
        
        return this.currentOctave;
    }

    //TODO: Synthesizer integration
}
