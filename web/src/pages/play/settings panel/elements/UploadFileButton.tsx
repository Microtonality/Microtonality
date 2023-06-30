import * as React from "react";
import {MutableRefObject, useRef} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface UploadFileButtonProps {
    text: string;
    accept: string;
    uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFileButton(props: UploadFileButtonProps): ReactJSXElement {

    const fileInputRef: MutableRefObject<HTMLInputElement> = useRef(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur();
        fileInputRef.current.click();
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.uploadFile(event);
        fileInputRef.current.value = '';
    }

    return (
        <div className={'flex flex-col mb-1'}>
            <button
                className={'settings-panel-button'}
                onClick={(e) => handleClick(e)}
            >
                {props.text}
            </button>
            <input
                className={'hidden'}
                type={'file'}
                ref={fileInputRef}
                accept={props.accept}
                onChange={(e) => handleFileUpload(e)}
            />
        </div>
    );
}