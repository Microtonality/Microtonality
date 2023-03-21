import * as React from "react";
import { MicrotonalConfig } from "../../utility/MicrotonalConfig";
import { useState } from "react";
import { ScaleNote } from "../../utility/microtonal/notes";
import { MCActions } from "./Reducers";
import { parseScalaFile } from "../../utility/microtonal/scala/ScalaParser";
import { Scale } from "../../utility/microtonal/Scale";
import { generateScalaFile } from "../../utility/microtonal/scala/ScalaGenerator";
import ScaleEditorInput from "./ScaleEditorInput";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import TuningFrequencyEditor from "./TuningFrequencyEditor";
import Button from "../../ui/Button";

interface ScaleEditorProps {
    microtonalConfig: MicrotonalConfig,
    mcDispatch: Function
}

export default function ScaleEditor(props: ScaleEditorProps) {

    const handleScalaFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        let file: File = event.target.files[0];
        let reader: FileReader = new FileReader();
        let readerResult: string | ArrayBuffer;
        let fileAsText: string = "";

        reader.onload = () => {
            readerResult = reader.result
            if (readerResult instanceof ArrayBuffer)
                fileAsText = new TextDecoder().decode(readerResult);
            else
                fileAsText = readerResult;

            let scale: Scale = parseScalaFile(fileAsText);
            props.mcDispatch({type: MCActions.SET_SCALE, scale: scale});
        }
        reader.onerror = () => {
            console.error("ScaleEditor.handleScalaFileUpload(): Could not read file");
        }
        reader.readAsText(file);
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
    
        //TODO addNote settings? maybe stretch goal
        // to generate equal tempered notes or increment based on a set cent or ratio value. (or just set to a value?)
        // if all ratios, change other ratios' denominators as well?

        // For now we just average the last two notes,
        // the final note in the scale and the octave note.
        let notes: ScaleNote[] = props.microtonalConfig.scaleConfig.scale.notes;
        let note: ScaleNote = ScaleNote.average(notes[notes.length - 1], props.microtonalConfig.scaleConfig.scale.octaveNote);
        
        props.mcDispatch({type: MCActions.ADD_NOTE, note: note});
    }

    // Swap Notes
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
    const handleSwapNotes = () => {
        props.mcDispatch({type: MCActions.SWAP_NOTES, currentIndex: draggingIndex, newIndex: dragOverIndex});
    }

    const mapNotes = (): ReactJSXElement[] => {

        let notesJSX: ReactJSXElement[] = [];
        let notes: ScaleNote[] = props.microtonalConfig.scaleConfig.scale.notes;

        // We want the 1/1 note to non-interactable.
        // Every other note can be moved/edited/deleted.
        for (let i = 0; i < notes.length; i++) {

            if (i === 0) {
                notesJSX.push(
                    <div 
                        key={i}
                        className={`inline-flex items-center`}>
                        <ScaleEditorInput noteIndex={i} scale={props.microtonalConfig.scaleConfig.scale} microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch} />
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
                        <ScaleEditorInput noteIndex={i} scale={props.microtonalConfig.scaleConfig.scale} microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch} />
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

            <div className="flex flex-col my-[1%] mx-[7%]">
                <Button
                    className="w-[99%]"
                    onClick={() => handleScalaFileGeneration()}
                    text="GENERATE SCALA FILE"
                    disabled={false}
                />
            </div>

            <TuningFrequencyEditor microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch}/>
 
            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    SCALE
            </div>

            <div className="flex flex-col my-[1%]">
                <Button 
                    onClick={() => handleAddNote()} 
                    className="w-[85%] mx-[7%] mb-[1%]"
                    text="ADD NOTE"
                    disabled={false}
                />
                {mapNotes()}
            </div>

            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    Octave Note
            </div>
            <div 
                className={`inline-flex items-center w-full`}>
                <ScaleEditorInput noteIndex={-1} scale={props.microtonalConfig.scaleConfig.scale} microtonalConfig={props.microtonalConfig} mcDispatch={props.mcDispatch} />
            </div>

        </div>
    )
}
