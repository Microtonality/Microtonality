import { Scale } from "../../Scale";
import { ScaleNote } from "../../notes/ScaleNote";
import { ScalaParser } from "../ScalaParser"

// TODO test
// Noteworthy test cases:
//
//   123 wow 7.8/10
//   23 wow 1.1
//   123 blah v2.3 9.5/10
//   22.2/3 asd/2 (22.2)
//   5/5.5 oo4.5.6.6.3o 1.2 (5/5)
//   aassdfpop12/3.5 yep (12/3)
//   asd.3.2 36.4 (3.2)

test('scala parser reads file and returns Scale object with fields', () => {
    
    // Arrange
    let testFile: string = 
        '! meanquar.scl\n' + 
        '!\n' + 
        '1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)\n' + 
        ' 12\n' + 
        '!\n' +
        ' 76.04900\n' +
        ' 193.15686\n' + 
        ' 310.26471\n' + 
        ' 5/4\n' + 
        ' 503.42157\n' + 
        ' 579.47057\n' + 
        ' 696.57843\n' + 
        ' 25/16\n' + 
        ' 889.73529\n' + 
        ' 1006.84314\n' +
        ' 1082.89214\n' +
        ' 2\n';

    // Create expected scale
    let title: string = 'meanquar.scl';
    let desc: string = '1/4-comma meantone scale. Pietro Aaron\'s temperament (1523)';
    let notes: ScaleNote[] = [];
    var pitchVals = ['76.04900', '193.15686', '310.26471', '5/4', '503.42157', '579.47057', '696.57843', '25/16', '889.73529', '1006.84314', '1082.89214', '2'];
    let val: string;
    for (val of pitchVals) {
        var note: ScaleNote = ScalaParser.ParsePitchValueLine(val);
        notes.push(note);
    }
    var expectedScale: Scale = new Scale(title, desc, notes);

    // Act
    var scale: Scale = ScalaParser.ParseScalaFile(testFile);

    // Assert
    expect(scale).toEqual(expectedScale);
})
