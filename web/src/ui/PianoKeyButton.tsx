import * as React from 'react'
import {MouseEventHandler} from "react";

interface PianoKeyButtonProps {
    children: any,
    faceUp?: boolean,
    className ?: string,
    onClick ?: MouseEventHandler | undefined
}

export default function PianoKeyButton(props: PianoKeyButtonProps) {
    return <div className={`border-4 border-black bg-piano-edge 
    ${props.faceUp ? 'rounded-t-3xl border-b-0 pt-2' : 'rounded-b-3xl pb-2'} ${props.className}`}
                onClick={props.onClick} tabIndex={0} role="button" aria-pressed="false">
        <div className={`w-full h-full 
        ${props.faceUp ? 'rounded-t-3xl' : 'rounded-b-3xl'} 
        p-2 bg-piano-surface flex items-center justify-center`}>
            {props.children}
        </div>
    </div>

}