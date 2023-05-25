import * as React from "react";

interface PopupProps {
    text: string;
    visible: boolean;
}

export default function Popup(props: PopupProps) {

    const visible: string = (props.visible) ? 'visible' : 'invisible';

    return (
        <div className={`${visible} absolute px-2 py-1 text-white font-agrandir-wide border border-gold rounded bg-bgdark`}>
            {props.text}
        </div>
    );
}
