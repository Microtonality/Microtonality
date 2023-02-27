import PianoKeyButton from "../../ui/PianoKeyButton";

export default function OctaveButtons(props: {
    octaveUp: Function,
    octaveDown: Function
}) {
    return <div className={"flex flex-col h-full mr-[1%]"}>
        <span className={"text-white text-center"}>Octave</span>
        <PianoKeyButton faceUp className={"lg:w-24 w-16 h-1/2"} onClick={() => props.octaveUp()}>
            <span className={"text-center"}>PgUp</span>
        </PianoKeyButton>
        <PianoKeyButton className={"lg:w-24 w-16 h-1/2"} onClick={() => props.octaveDown()}>
            <span className={"text-center"}>PgDown</span>
        </PianoKeyButton>
    </div>
}
