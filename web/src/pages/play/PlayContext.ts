import {Context, createContext} from 'react';
import {MicrotonalConfigHistory} from "./Reducers";

// More information on Contexts and Providers:
// https://react.dev/learn/scaling-up-with-reducer-and-context
export const MCHistoryContext: Context<MicrotonalConfigHistory> = createContext(null);
export const MCDispatchContext: Context<Function> = createContext(null);

export const ErrorMsgContext: Context<string> = createContext(null);
export const ErrorMsgDispatchContext: Context<Function> = createContext(null);