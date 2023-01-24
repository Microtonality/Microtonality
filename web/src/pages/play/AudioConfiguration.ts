import ScaleCore from "../../utility/microtonal/ScaleCore";

export class AudioConfiguration {

    audioContext: AudioContext;
    masterGain: GainNode;
    dynamicsCompressor: DynamicsCompressorNode;

    scaleCore: ScaleCore;
    selectedNotes: Array<number>

    currentOctave: number;
    maxOctave: number = 8;
    minOctave: number = 0;

    pitchBend: number
    pitchBendRange: number

    volume: number

    constructor() {
        this.scaleCore = new ScaleCore();
        this.currentOctave = 3;
        this.volume = 0.05;
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

    InitializeContextAndNodes(): void {

        this.audioContext = new (window.AudioContext)();

        this.masterGain = new GainNode(this.audioContext);
        this.masterGain.gain.setValueAtTime(this.volume, 0);
        this.masterGain.connect(this.audioContext.destination);

        // Attack and release
        this.dynamicsCompressor = new DynamicsCompressorNode(this.audioContext);
        this.dynamicsCompressor.attack.value = 0.9;
        this.dynamicsCompressor.release.value = 0.9;
        this.dynamicsCompressor.connect(this.masterGain);
    }

    Connect(oscillator: OscillatorNode): void {

        oscillator.connect(this.masterGain);
    }

    UpdateVolume = (volume: number) => {

        if (volume < 0 || volume > 1)
            return;

        this.volume = volume

        this.masterGain.gain.setValueAtTime(this.volume, 0);
    }

}
