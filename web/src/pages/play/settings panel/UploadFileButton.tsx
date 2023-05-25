import * as React from "react";
import {MutableRefObject, useRef} from "react";

interface UploadFileButtonProps {
    text: string;
    accept: string;
    uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFileButton(props: UploadFileButtonProps) {

    const buttonRef: MutableRefObject<HTMLButtonElement> = useRef(null);
    const inputRef: MutableRefObject<HTMLInputElement> = useRef(null);

    const handleClick = () => {
        buttonRef.current.blur();
        inputRef.current.click();
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.uploadFile(event);

        // Allows multiple uploads of the same file.
        inputRef.current.value = '';
    }

    return(
        <div className={`flex flex-col mb-1`}>
            <button
                className={'settings-panel-button'}
                ref={buttonRef}
                onClick={handleClick}>
                {props.text}
            </button>
            <input
                className={'hidden'}
                type={'file'}
                ref={inputRef}
                accept={props.accept}
                onChange={(e) => handleFileUpload(e)}
            />
        </div>
    );
}