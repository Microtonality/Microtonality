
function generateEqualTemperedScale(notes: number) {
    let multipliers = [];
    for (let i=0; i<numOfTones; i++) {
        multipliers.push((440 * Math.pow(2, i/12)) / 440);
    }
    return multipliers;
}