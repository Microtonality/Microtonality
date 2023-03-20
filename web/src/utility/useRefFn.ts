import { useRef } from 'react';
import * as React from "react";

const SENTINEL = Symbol("lazyRef.noValue");

// Adapted from https://github.com/facebook/react/issues/14490
export function useRefFn<T>(init: () => T) {
    const ref = useRef<T | typeof SENTINEL>(SENTINEL);
    if (ref.current === SENTINEL) {
        ref.current = init();
    }
    return ref as React.MutableRefObject<T>;
}
