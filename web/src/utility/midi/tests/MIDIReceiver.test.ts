import { MIDIReceiver } from "../MIDIReceiver";

test.skip('MIDIReceiver.initDevices(midi)', () => {

    // Arrange

    let receiver :MIDIReceiver = new MIDIReceiver();

    // connect to instrument so MIDI initDevices can be called
    // receiver.connectToInstrument();

    let midi: WebMidi.MIDIAccess;

    // create expectedMidiInput and expectedMidiOutput
    const expectedMidiInput: WebMidi.MIDIInput[] = [];
    const expectedMidiOutput: WebMidi.MIDIInput[] = [];

    // Act
    receiver.initDevices(midi);

    // Assert
    expect(receiver.midiInput).toEqual(expectedMidiInput);
    expect(receiver.midiOutput).toEqual(expectedMidiOutput);
})

test('Test the MIDIReceiver.initDevices initializes midi devices correctly', () => {
    // Arrange

    const midiReceiver = new MIDIReceiver();

    // not sure what values are being used here
    let mockMIDIAccess: WebMidi.MIDIAccess;

    // Act
    // call the initDevices function
    midiReceiver.initDevices(mockMIDIAccess);

    // Assert
    expect(midiReceiver.midiInput).toEqual(0);
    expect(midiReceiver.midiOutput).toEqual(0);
})

test.skip('MIDIReceiver.onMIDIMessage', () => {
    // Arrange

    // Act

    // Assert

})