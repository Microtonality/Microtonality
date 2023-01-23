export default class FrequencyBar {

    notesPerOctave: number;
    frequencyMappings: Map<number, number>
    frequencyMappingsReverse: Map<number, number>
    allFrequencies: Array<number>;
    octaves: Array<Array<number>>;
    currentOctave: number;
    homerowKeys: Array<String>
    
    constructor() {
        this.notesPerOctave;
        this.allFrequencies = new Array<number>
        this.octaves = new Array<Array<number>>
        this.frequencyMappings = new Map<number, number>; //index of active note => homerow key index
        this.frequencyMappingsReverse = new Map<number, number>; //homerow key index => index of active note
        this.currentOctave;
        this.homerowKeys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j']
    }

    createFrequencyBar(sliderValue: number, currOctave: number, baseFreq: number) {
        this.updateNotesPerOctave(sliderValue);
        this.updateCurrentOctave(currOctave);
        this.updateAllFrequencies(baseFreq);
        this.updateOctaveFrequencies();
        this.setDefaultMapping();
    }

    //Sets the notes per octave to the value of the slider
    updateNotesPerOctave(sliderValue: number) {
        this.notesPerOctave = sliderValue;
    }

    //Sets octave to synthesizer's octave
    updateCurrentOctave(currOctave: number) {
        this.currentOctave = currOctave;
    }

    //Creates array of equal-tempered frequencies
    updateAllFrequencies(baseFreq: number) {
        let temp = []
        let ratio = Math.pow(2, 1/this.notesPerOctave.valueOf())
        let currFreq = baseFreq/(Math.pow(2, 4))
        for (let i = 0; i <=(this.notesPerOctave.valueOf()*10); i++) {
            temp.push(currFreq)
            currFreq = currFreq*ratio
        }
        this.allFrequencies = temp;
    }

    //Separates each octave of frequencies into individual arrays within a 2d array
    updateOctaveFrequencies() {
        for (let i = 0; i < 11; i++) {
            this.octaves[i] = new Array<number>
            for (let j = 0; j < this.notesPerOctave.valueOf(); j++) {
                let newTemp = this.allFrequencies[(this.notesPerOctave.valueOf() * i) + j]
                this.octaves[i].push(newTemp);
            }
        }

    }

    //Maps homerow keys to notes C-B in order on page load
    setDefaultMapping() {
        this.frequencyMappings = new Map<number, number>
        let val = this.notesPerOctave.valueOf()/12.0
        for (let i = 0; i < 12; i++) {
            this.frequencyMappings.set(Math.floor(val*i), i)
            this.frequencyMappingsReverse.set(i, Math.floor(val*i))
        }
    }

    //Re-assigns keys
    async changeAssignment(newAssignment: number) {

        //Deletes assignment if clicked on
        if (this.frequencyMappings.has(newAssignment)) {
            this.frequencyMappingsReverse.delete(this.frequencyMappings.get(newAssignment))
            this.frequencyMappings.delete(newAssignment)
            return;
        }

        //Reads in key press, loops until homerow key is pressed
        const readKey = () => new Promise(resolve => window.addEventListener('keydown', resolve, { once: true }));
        let containFlag = 0;
        let pianoKey: any;
        let keyIndex;

        while (containFlag == 0) {
            pianoKey = await readKey();
            if (pianoKey.key == "Escape") {
                return
            }
            for (let i = 0; i < 12; i++) {
                if (pianoKey.key == this.homerowKeys[i]) {
                    containFlag = 1;
                    keyIndex = i;
                    break;
                }
            }
        }

        //If key is already assigned, re-assigns it, otherwise just assigns it
        if (this.frequencyMappingsReverse.has(keyIndex)) {
            this.frequencyMappings.delete(this.frequencyMappingsReverse.get(keyIndex))
            this.frequencyMappingsReverse.delete(keyIndex)

            this.frequencyMappings.set(newAssignment, keyIndex)
            this.frequencyMappingsReverse.set(keyIndex, newAssignment)
            
            return;
        }

        else {
            this.frequencyMappings.set(newAssignment, keyIndex)
            this.frequencyMappingsReverse.set(keyIndex, newAssignment)
            
            return;
        }
    }

}