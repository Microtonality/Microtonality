import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {useContext, useReducer, useState} from "react";
import {HIDE_ERROR} from "../../ui/ErrorPopup";
import {MicrotonalConfigHistory, MicrotonalConfigReducer} from "./Reducers";
import {createMicrotonalConfig, MicrotonalConfig} from "../../utility/MicrotonalConfig";
import {ErrorMsgContext, ErrorMsgDispatchContext, MCDispatchContext, MCHistoryContext} from "./PlayContext";
import {Scale} from "../../utility/microtonal/Scale";

// More information on Contexts and Providers:
// https://react.dev/learn/scaling-up-with-reducer-and-context
// Docs on how this function should be written:
// https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file
interface PlayProviderProps {
    children: ReactJSXElement;
}

// This is used to help prop drilling throughout
// the entirety of the Play page and its placement in
// DOM allows the synth to maintain state if the user
// happened to click to another page. (check usages)
export default function PlayProvider(props: PlayProviderProps): ReactJSXElement {

    const [microtonalConfigHistory, mcDispatch] = useReducer(
        MicrotonalConfigReducer,
        {
            previous: [],
            current: createMicrotonalConfig(),
            next: []
        } as MicrotonalConfigHistory
    );

    const [errorMsg, displayErrorMsg] = useState<string>(HIDE_ERROR);

    return (
        <MCHistoryContext.Provider value={microtonalConfigHistory}>
        <MCDispatchContext.Provider value={mcDispatch}>
            <ErrorMsgContext.Provider value={errorMsg}>
            <ErrorMsgDispatchContext.Provider value={displayErrorMsg}>
                {props.children}
            </ErrorMsgDispatchContext.Provider>
            </ErrorMsgContext.Provider>
        </MCDispatchContext.Provider>
        </MCHistoryContext.Provider>
    );
}

export function useMConfigHistory(): MicrotonalConfigHistory { return useContext(MCHistoryContext); }
export function useMConfig(): MicrotonalConfig { return useMConfigHistory().current; }
export function useScale(): Scale { return useMConfig().scaleConfig.scale; }
export function useMCDispatch(): Function { return useContext(MCDispatchContext); }

export function useErrorMsg(): string { return useContext(ErrorMsgContext); }
export function useSetErrorMsg(): Function { return useContext(ErrorMsgDispatchContext); }

