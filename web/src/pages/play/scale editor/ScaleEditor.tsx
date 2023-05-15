import * as React from "react";
import { useState } from "react";
import { ScaleNote } from "../../../utility/microtonal/notes";
import { MCActions } from "../Reducers";
import { parseScalaFile } from "../../../utility/microtonal/scala/ScalaParser";
import { Scale } from "../../../utility/microtonal/Scale";
import { generateScalaFile } from "../../../utility/microtonal/scala/ScalaGenerator";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import TuningFrequencyEditor from "../TuningFrequencyEditor";
import Button from "../../../ui/Button";
import BaseNoteInput from "./BaseNoteInput";
import OctaveNoteInput from "./OctaveNoteInput";
import ScaleNoteInput from "./ScaleNoteInput";

interface ScaleEditorProps {
    scale: Scale;
    tuningFrequency: number;
    mcDispatch: Function;
    displayErrorMsg: Function;
}

// The ScaleEditor contains file upload and download for Scala files (.scl),
// a TuningFrequencyEditor, and all the notes in the current scale.
export default function ScaleEditor(props: ScaleEditorProps) {

    // Set the current scale from an uploaded '.scl' file.
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

            let scale: Scale = null;
            try {
                scale = parseScalaFile(fileAsText);
            } catch (e) {
                props.displayErrorMsg(e.message);
                return;
            }

            if (scale !== null)
                props.mcDispatch({type: MCActions.SET_SCALE, scale: scale});
        }
        reader.onerror = () => {
            props.displayErrorMsg(SCALA_FILE_UPLOAD_ERROR);
        }
        reader.readAsText(file);
    }

    // Generate a .scl file from the current scale
    // and download it to the user's computer.
    const handleScalaFileGeneration = () => {

        let file: File = null;
        try {
            file = generateScalaFile(props.scale);
        } catch(e) {
            props.displayErrorMsg(e.message);
            return;
        }

        // Create download link, simulate click
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = file.name;

        element.click();
        element.remove();
    }
    
    // Insert a new note at the end of the scale.
    const handleAddNote = () => {
        // Average the last note in the scale and the octave note.
        let notes: ScaleNote[] = props.scale.notes;
        let note: ScaleNote = ScaleNote.average(notes[notes.length - 1], props.scale.octaveNote);

        props.mcDispatch({type: MCActions.ADD_NOTE, note: note});
    }

    // Note Swapping
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
        if (draggingIndex === dragOverIndex)
            return;

        props.mcDispatch({type: MCActions.SWAP_NOTES, currentIndex: draggingIndex, newIndex: dragOverIndex});
    }

    // Return an array of JSXElements representing
    // each note in the scale.
    const mapNotes = (): ReactJSXElement[] => {

        let notesJSX: ReactJSXElement[] = [];

        // Base note
        notesJSX.push(
            <div key={0}
                className={`inline-flex items-center`}>
                <BaseNoteInput/>
            </div>
        );

        // Scale notes
        let notes: ScaleNote[] = props.scale.notes;
        for (let i = 1; i < notes.length; i++) {
            notesJSX.push(
                <div
                    draggable
                    key={i}
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={() => handleDragOver(i)}
                    onDragEnd={handleDragEnd}
                    className={`inline-flex items-center ${dragOverIndex === i ? 'drag-over' : ''}`}>
                    <ScaleNoteInput note={props.scale.notes.at(i)} noteIndex={i} mcDispatch={props.mcDispatch}/>
                </div>
            );
        }

        // Scale octave note
        notesJSX.push(
            <div key={notes.length}>
                <OctaveNoteInput note={props.scale.octaveNote} mcDispatch={props.mcDispatch} />
            </div>
        );

        return notesJSX;
    }

    return(
        <div>

            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[1%] mx-[7%]">
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

            <TuningFrequencyEditor tuningFrequency={props.tuningFrequency} mcDispatch={props.mcDispatch}/>
 
            <div className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
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

        </div>
    )
}

const SCALA_FILE_UPLOAD_ERROR: string = "Your scala file could not be uploaded. Please try again.";
