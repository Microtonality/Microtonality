import scaleCore, {ScaleCore} from "../ScaleCore";
import * as MIDIpitches from './MIDInoteFrequencies.json';
  

test('test ScaleCore.MIDINotesToFrequency() with values in json file', () =>{
    // Arrange
    let scaleCore = new ScaleCore();

    // read in JSON for MIDI note pitches. 
    // side note: Pitches in file must be rounded to 3 decimals
    let dataStr = JSON.stringify(MIDIpitches);
    
    // Act
    const map = new Map(Object.entries(JSON.parse(dataStr)));
    map.forEach(({'MIDI Note': midiNote, 'Pitch (Hz)': pitch }, key) => {
        // test each MIDI Note and compare output of ScaleCore.MIDINotesToFrequency
        let expectedNoteFrequency: number = Number(Number(pitch).toFixed(3));
        let returnedNoteFrequency: number  = Number(scaleCore.MIDINotesToFrequency(midiNote).toFixed(3));
    
        // Assert
        expect(returnedNoteFrequency).toEqual(expectedNoteFrequency);
    });
})


test.skip('ScaleCore.MIDINotesToFrequency', () =>{
    // Arrange
    
    // MIDI Note number to convert into a frequency
    let MIDINote: number = 2;

    let expectedNoteFrequency: number = 9.177023997418987;

    let scaleCore = new ScaleCore();

    // Act
    let returnedNoteFrequency = scaleCore.MIDINotesToFrequency(MIDINote);

    // Assert
    expect(returnedNoteFrequency).toEqual(expectedNoteFrequency);

})
