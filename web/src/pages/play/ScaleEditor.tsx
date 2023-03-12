import * as React from "react";
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import { useEffect, useState } from "react";

import close from "../../img/icons/close.png"
import disabledClose from "../../img/icons/close-disabled.png"
import { CentNote, RatioNote, ScaleNote } from "../../utility/microtonal/notes";
import { addNote, deleteNote, setScale, swapNotes } from "./Reducers";
import { parseScalaFile } from "../../utility/microtonal/scala/ScalaParser";
import { Scale, scaleFromCents } from "../../utility/microtonal/Scale";
import { generateScalaFile } from "../../utility/microtonal/scala/ScalaGenerator";
import ScaleEditorInput from "./ScaleEditorInput";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface ScaleEditorProps {
    microtonalConfig: MicrotonalConfig
    setMicrotonalConfig: Function
}

export default function ScaleEditor(props: ScaleEditorProps) {

    const handleScalaFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();
        let readerResult: string | ArrayBuffer;
        let fileAsText: string = "";

        reader.readAsText(file);
        reader.onload = () => {

            readerResult = reader.result
            if (readerResult instanceof ArrayBuffer)
                fileAsText = new TextDecoder().decode(readerResult);
            else
                fileAsText = readerResult;

            let scale: Scale = parseScalaFile(fileAsText);
            props.setMicrotonalConfig(setScale(props.microtonalConfig, scale));
        }

        reader.onerror = () => {
            console.error("ScaleEditor.handleScalaFileUpload(): Could not read file");
        }
    }
    
    const handleScalaFileGeneration = () => {
        
        let file: File = generateScalaFile(props.microtonalConfig.scaleConfig.scale);

        // Create download link, simulate click
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = file.name;

        document.body.appendChild(element); // Required for this to work in FireFox? TODO
        element.click();
        element.remove();
    }
    
    // Insert a generated note at the end of the scale
    const handleAddNote = () => {
    
        // TODO addNote settings? maybe stretch goal
        // to generate equal tempered notes or increment based on a set cent or ratio value. (or just set to a value?)
        // to insert before the octave note or after.
        // if all ratios, change other ratios' denominators as well? 

        // For now we just average the last two notes,
        // the final note in the scale and the octave note.
        let notes: ScaleNote[] = props.microtonalConfig.scaleConfig.scale.notes;
        let note: ScaleNote = ScaleNote.average(notes[notes.length - 1], props.microtonalConfig.scaleConfig.scale.octaveMultiplier);
        
        props.setMicrotonalConfig(addNote(props.microtonalConfig, note));
    }

    const handleDeleteNote = (noteIndex: number) => {
        props.setMicrotonalConfig(deleteNote(props.microtonalConfig, noteIndex));
    }

    const handleSwapNotes = () => {
        props.setMicrotonalConfig(swapNotes(props.microtonalConfig, draggingIndex, dragOverIndex));
    }

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggingIndex(index);
    }
      
    const handleDragOver = (index: number) => {
        setDragOverIndex(index);
    }
      
    const handleDragEnd = () => {
        if (draggingIndex !== null && dragOverIndex !== null) {
            handleSwapNotes();
        }
        setDraggingIndex(null);
        setDragOverIndex(null);
    }

    const mapNotes = (): ReactJSXElement[] => {

        let notesJSX: ReactJSXElement[] = [];
        let notes: ScaleNote[] = props.microtonalConfig.scaleConfig.scale.notes;

        // We want the 1/1 note to not be interactable with the user.
        // Every other note can be moved/edited/deleted.
        for (let i = 0; i < notes.length; i++) {

            if (i === 0) {
                notesJSX.push(
                    <div 
                        key={0}
                        className={`inline-flex items-center`}>
                        <ScaleEditorInput noteIndex={0} scale={props.microtonalConfig.scaleConfig.scale} microtonalConfig={props.microtonalConfig} setMicrotonalConfig={props.setMicrotonalConfig} />
                        <img src={disabledClose} className="w-[8%] h-[8%] min-w-[1.5rem]" />
                    </div>
                );
            }
            else {
                notesJSX.push(
                    <div 
                        draggable
                        key={i}
                        onDragStart={() => handleDragStart(i)}
                        onDragOver={() => handleDragOver(i)}
                        onDragEnd={handleDragEnd}
                        className={`inline-flex items-center ${dragOverIndex === i ? 'drag-over' : ''}`}>
                        <ScaleEditorInput noteIndex={i} scale={props.microtonalConfig.scaleConfig.scale} microtonalConfig={props.microtonalConfig} setMicrotonalConfig={props.setMicrotonalConfig} />
                        <img src={close} onClick={() => handleDeleteNote(i)} className="w-[8%] h-[8%] min-w-[1.5rem] cursor-pointer" />
                    </div>
                );
            }
        }

        return notesJSX;
    }

    return(
        <div className="">
            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[1%] mx-[7%]">
                IMPORT SCALA
            </div>
            <div className="mb-3 w-[85%] mx-[7%]">                
            <input
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-agrandir text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                type="file"
                id="formFile"
                accept=".scl" 
                onChange={(event) => handleScalaFileUpload(event)}/>
            </div>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    MIDI DEVICE
            </div>
            <div className="flex w-[85%] h-10 mt-[2%] mx-[7%]">
                <select data-te-select-init className="w-full rounded-md font-agrandir pl-[2%]">
                    <option value="1">MIDI Device 1</option>
                    <option value="2">MIDI Device 2</option>
                    <option value="3">MIDI Device 3</option>
                    <option value="4">MIDI Device 4</option>
                </select>
            </div>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    BASE
                FREQUENCY
            </div>
            <div className="flex w-[85%] h-10 mt-[2%] mx-[7%]">
                <input type="number" defaultValue={props.microtonalConfig.scaleConfig.tuningFrequency} step="0.0001" className="w-full rounded-md font-agrandir pl-[2%]" />
            </div>
 
            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    SCALE
            </div>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    Octave Note
            </div>
            <div 
                className={`inline-flex items-center`}>
                <ScaleEditorInput noteIndex={-1} scale={props.microtonalConfig.scaleConfig.scale} microtonalConfig={props.microtonalConfig} setMicrotonalConfig={props.setMicrotonalConfig} />
                <img src={disabledClose} className="w-[8%] h-[8%] min-w-[1.5rem]" />
            </div>

            <div className="flex flex-col my-[1%]">
                <button onClick={() => handleAddNote()} className="w-[85%] mx-[7%] mb-[2.5%] border-[1px] bg-white hover:bg-neutral-100 rounded-md flex-auto cursor-pointer font-agrandir text-bgdark">ADD NOTE</button>
                {mapNotes()}
            </div>

            <div className="flex flex-col my-[1%]">                
                <button
                    className="w-[85%] mx-[7%] mb-[2.5%] border-[1px] bg-white hover:bg-neutral-100 rounded-md flex-auto cursor-pointer font-agrandir text-bgdark"
                    id="formFile"
                    onClick={() => handleScalaFileGeneration()}> 
                    GENERATE SCALA FILE 
                </button>
            </div>

        </div>
    )
}
