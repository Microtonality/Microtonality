import { MidiReceiver } from "../MidiReceiver";

test('MidiReceiver.initDevices(midi)', () => {

    // Arrange

    // create WebMidi.MIDIAccess to pass into initDevices
    var midi: WebMidi.MIDIAccess;

    // create expectedMidiInput and expectedMidiOutput
    const expectedMidiInput: WebMidi.MIDIInput[] = [];
    const expectedMidiOutput: WebMidi.MIDIInput[] = [];

    const midiReceiver: MidiReceiver = new MidiReceiver();

    // Act
    midiReceiver.initDevices(midi);

    // Assert
    expect(midiReceiver.midiInput).toEqual(expectedMidiInput);
    expect(midiReceiver.midiOutput).toEqual(expectedMidiOutput);
})