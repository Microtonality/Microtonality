import { MIDIReceiver } from "../MIDIReceiver";

test('MIDIReceiver.initDevices(midi)', () => {

    // Arrange

    // create WebMidi.MIDIAccess to pass into initDevices
    var midi: WebMidi.MIDIAccess;

    // create expectedMidiInput and expectedMidiOutput
    const expectedMidiInput: WebMidi.MIDIInput[] = [];
    const expectedMidiOutput: WebMidi.MIDIInput[] = [];

    const midiReceiver: MIDIReceiver = new MIDIReceiver();

    // Act
    midiReceiver.initDevices(midi);

    // Assert
    expect(midiReceiver.midiInput).toEqual(expectedMidiInput);
    expect(midiReceiver.midiOutput).toEqual(expectedMidiOutput);
})