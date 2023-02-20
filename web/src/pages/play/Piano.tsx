import {useState} from "react";

function createDefaultKeyMapping(keys: number) {
    return {}
}


export default function Piano(props: {
    synthIndex
    notesPerOctave: number
    keyMapping: Record<number, number>,
    setKeyMapping: Function
}) {
    const [octave, setOctave] = useState(0);


    return <div></div>;
}