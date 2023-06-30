import * as React from "react";
import {useState} from "react";
import SettingsFieldTitle from "./SettingsFieldTitle";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface DescriptionEditorProps {
    className?: string;
    title: string;
    description: string;
    setDescription: (desc: string) => void;
}

export default function DescriptionEditor(props: DescriptionEditorProps): ReactJSXElement {

    const [tempDescription, setTempDescription] = useState<string>(props.description);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    }

    return (
        <div className={props.className}>
            <SettingsFieldTitle text={props.title} />
            <textarea
                className={'settings-panel-input w-full resize-none'}
                key={props.description}
                value={tempDescription}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setTempDescription(e.target.value.replace(/\n/g, ''))}
                onBlur={(e) => props.setDescription(e.target.value)}
            />
        </div>
    );
}