import * as React from 'react'
import PianoKeyButton from "../../ui/PianoKeyButton";

export default function OctaveButtons(props: {
    octaveUp: Function,
    octaveDown: Function
    className: string
}) {
    return <div className={`flex flex-col h-full ${props.className}`}>
        <span className={"text-white text-center font-agrandir-wide"}>OCTAVE</span>
        <PianoKeyButton faceUp className={"lg:w-24 w-16 h-1/2"} onClick={() => props.octaveUp()}>
            <svg className={'fill-neutral-700 dark:fill-gold'} width="33" height="33" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_316_24360)">
                    <path d="M16.5954 11.4768L24.6515 19.5329H8.53931L16.5954 11.4768Z"/>
                </g>
                <defs>
                    <clipPath id="clip0_316_24360">
                    <rect width="32.2244" height="32.2244" fill="white" transform="translate(0.483154 0.735352)"/>
                    </clipPath>
                </defs>
            </svg>
        </PianoKeyButton>
        <PianoKeyButton className={"lg:w-24 w-16 h-1/2"} onClick={() => props.octaveDown()}>
            <svg className={'fill-neutral-700 dark:fill-gold'} width="17" height="9" viewBox="0 0 17 9" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59542 8.2085L16.6515 0.152384H0.539307L8.59542 8.2085Z"/>
            </svg>
        </PianoKeyButton>
    </div>
}
