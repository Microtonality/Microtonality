import * as React from 'react'
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface BorderedContainerProps {
    className?: string;
    children: ReactJSXElement | ReactJSXElement[];
}

export default function BorderedContainer(props: BorderedContainerProps): ReactJSXElement {
    return (
        <div className={`${props.className} border-gold border-2 rounded-xl bg-bglight`}>
            {props.children}
        </div>
    );
}
