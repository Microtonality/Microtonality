import { twelveTET } from "./Scales";

export class MicrotonalScale {
    frequencies: Array<number> // Represented in Hz

    constructor() {
        this.frequencies = twelveTET;
    }

    setWithScala(scala: File) {
        //TODO: Parse Scala Input
    }

    setByDivision(numberOfDivisions: number) {
        
    }
}