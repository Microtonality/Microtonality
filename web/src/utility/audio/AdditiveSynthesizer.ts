class AdditiveSynthesizer {
    oscillators: Array<Oscillator> = [
        new Oscillator(1, 1),
        new Oscillator(2, 1),
        new Oscillator(3, 1),
        new Oscillator(4, 1),
        new Oscillator(5, 1),
        new Oscillator(6, 1),
        ]

    gain: number

    attack: number = 1
    decay: number = 1
    sustain: number = 1
    release: number = 1

    onPlayFrequency(frequency: number, velocity: number) {
        for (let oscillator of this.oscillators) {
            oscillator.beginPlay(frequency, velocity + this.gain)
        }
    }

    onStopFrequency(frequency: number) {
        for (let oscillator of this.oscillators) {
            oscillator.endPlay(frequency)
        }
    }
}