import * as React from "react";

interface ButtonProps {
    onClick: (event: any) => void,
    text: string,
    disabled: boolean
    className: string,
}

export default function Button(props: ButtonProps) {

    return <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={props.className + " p-1 shadow-xl active:shadow-lg rounded-md font-agrandir " + (props.disabled ? "bg-neutral-700 text-neutral-500" : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300")}
    >{props.text}</button>;
}