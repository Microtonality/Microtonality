import * as React from "react";

interface ButtonProps {
    onClick: (event: any) => void,
    text: string,
    disabled: boolean
}

export default function Button(props: ButtonProps) {

    return <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={"p-1 shadow-xl active:shadow-lg rounded-sm " + (props.disabled ? "bg-neutral-700" : "bg-neutral-200")}
    >{props.text}</button>;
}