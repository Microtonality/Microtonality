class AdditiveSynthesizer {

    currentOscillatorSettings: Array<OscillatorSettings> = [
        new OscillatorSettings(1, 1, "sine"),
        new OscillatorSettings(2, 1, "sine"),
        new OscillatorSettings(3, 1, "sine"),
        new OscillatorSettings(4, 1, "sine"),
        new OscillatorSettings(5, 1, "sine"),
        new OscillatorSettings(6, 1, "sine"),
        ]

    oscillatorStacks: { [key: number]: OscillatorStack } = {}

    gain: number

    attack: number = 1
    decay: number = 1
    sustain: number = 1
    release: number = 1

    onPlayFrequency(frequency: number, velocity: number) {
        this.oscillatorStacks[frequency] = new OscillatorStack(
                this.currentOscillatorSettings,
                frequency,
                velocity,
                )

        this.oscillatorStacks[frequency].beginPlay()
    }

    onStopFrequency(frequency: number) {
        this.oscillatorStacks[frequency].endPlay()
        delete this.oscillatorStacks[frequency]
    }


}