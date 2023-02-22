import scaleCore, {ScaleCore} from "../ScaleCore";
import { readFile } from 'node:fs';
import * as assert from "assert";

interface ScaleNote {
    'MIDI Note': number,
    'Pitch (Hz)': number,
}

test('test ScaleCore.MIDINotesToFrequency() with values in json file', () =>{
    // Arrange
    let scaleCore = new ScaleCore();

    let contents: Array<ScaleNote>;

    readFile('./MIDInoteFrequencies.json', "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed: ", err)
            return;
        }

        try {
            contents = JSON.parse(jsonString)
        } catch (err) {
            console.log("Error parsing JSON string: ", err)
        }
    })

    expect(contents).not.toEqual(null);
    
    // Check pitch generation
    contents.forEach(({'MIDI Note': midiNote, 'Pitch (Hz)': pitch }, key) => {
        // test each MIDI Note and compare output of ScaleCore.MIDINotesToFrequency
        let expectedNoteFrequency: number = Number(Number(pitch).toFixed(3));
        let returnedNoteFrequency: number  = Number(scaleCore.MIDINotesToFrequency(midiNote).toFixed(3));
    
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
