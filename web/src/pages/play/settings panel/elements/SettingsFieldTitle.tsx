import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface SettingsFieldTitleProps {
    className?: string;
    text: string;
}

export default function SettingsFieldTitle(props: SettingsFieldTitleProps): ReactJSXElement {
    return (
            <div className={`${props.className} w-full mb-0.5 select-none font-agrandir-wide text-white dark:text-neutral-200 2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs`}>
                {props.text}
            </div>
    );
}