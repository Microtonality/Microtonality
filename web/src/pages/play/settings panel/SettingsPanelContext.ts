import {Context, createContext, Dispatch, SetStateAction} from 'react';

// This data is insignificant in that we don't want
// changes to it to update the microtonal config,
// which would create a new config in the history.
// So, we never call mcDispatch on updates, and we use
// this context helps us manage the states cleanly.
interface FileData {
    title: string;
    description: string;
}

export interface MConfigData extends FileData {}
export const MConfigDataContext: Context<MConfigData> = createContext(null);
export const MConfigDataDispatchContext: Context<Function> = createContext(null);

export interface ScalaData extends FileData {}
export const ScalaDataContext: Context<ScalaData> = createContext(null);
export const ScalaDataDispatchContext: Context<Function> = createContext(null);


export enum ScaleEditorTab {
    VISUAL,
    SCALA
}

export const ScaleEditorTabContext: Context<ScaleEditorTab> = createContext(null);
export const ScaleEditorTabDispatchContext: Context<Dispatch<SetStateAction<ScaleEditorTab>>> = createContext(null);

