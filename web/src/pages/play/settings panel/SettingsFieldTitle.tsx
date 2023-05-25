import * as React from "react";

interface SettingsFieldTitleProps {
    text: string;
}

export default function SettingsFieldTitle(props: SettingsFieldTitleProps) {

    return (
        <div className={'mb-0.5 select-none font-agrandir-wide text-white dark:text-gold 2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs'}>
            {props.text}
        </div>
    );
}