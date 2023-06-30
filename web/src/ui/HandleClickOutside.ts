import {useEffect, MutableRefObject, useRef} from 'react';

export default function useHandleClickOutsideRef(onClickOutside: Function, ...args: any[]): MutableRefObject<any> {
    const ref: MutableRefObject<any> = useRef(null);
    
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside(...args);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return (): void => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);
    
    return ref;
}