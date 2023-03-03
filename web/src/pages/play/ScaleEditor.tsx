import * as React from "react";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import { useEffect, useState } from "react";

import hamburger from "../../ui/icons/hamburger.png"
import close from "../../ui/icons/close.png"

export default function ScaleEditor(props:{scaleConfig: ScaleConfig}) {

    const [rowKey, setRowKey] = useState(0)

    function ScaleEditorInput(props:{ key: number, value: number }) {

        return (
            <div className="inline-flex items-center my-[2.5%]">
                <img src={hamburger} className="w-[6%] min-w-[1.5rem] cursor-pointer"/>
    
                <label htmlFor={rowKey.toString()} className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                    <input id={rowKey.toString()} type="checkbox" className="hidden peer" />
                    <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-gold peer-checked:bg-white rounded-l-md border-r-[1px] border-black pt-[4%] min-w-[3rem]">CENTS</div>
                    <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">RATIO</div>
                </label>
    
                <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                    <input type="number" step="0.0001" value={props.value} onChange={setValue} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                </div>
            </div>
        )
    }

    interface State {
        elements: JSX.Element[]
    }

    const [state, setState] = useState<State>({
        elements: []
    })

    function addRow() {
        setRowKey(rowKey + 1)
        const key = state.elements.length;
        const newRow = <ScaleEditorInput key={key} value={key} />
        setState((prevState) => ({
            elements: [...prevState.elements, newRow]
        }))
    }

    function removeRow(key: number) {
        setState((prevState) => ({
          elements: prevState.elements.filter((_, index) => index !== key),
        }));
    }

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    function handleDragStart(index: number) {
        setDraggingIndex(index);
      }
      
      function handleDragOver(index: number) {
        setDragOverIndex(index);
      }
      
      function handleDragEnd() {
        if (draggingIndex !== null && dragOverIndex !== null) {
          setState((prevState) => {
            const elements = [...prevState.elements];
            const [removed] = elements.splice(draggingIndex, 1);
            elements.splice(dragOverIndex, 0, removed);
            return { elements };
          });
        }
        setDraggingIndex(null);
        setDragOverIndex(null);
      }


    function setValue() {

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
                id="formFile" />
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
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">BASE
                FREQUENCY
            </div>
            <div className="flex w-[85%] h-10 mt-[2%] mx-[7%]">
                <input type="number" value={440} step="0.0001" className="w-full rounded-md font-agrandir pl-[2%]" />
            </div>
 
            <div
                className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide text-white mt-[5%] mx-[7%]">
                    SCALE
            </div>
            <div className="flex flex-col my-[1%]">
                <button onClick={addRow} className="w-[85%] mx-[7%] mb-[2.5%] border-[1px] bg-white hover:bg-neutral-100 rounded-md flex-auto cursor-pointer font-agrandir text-bgdark">ADD ROW</button>
                {state.elements.map((element, index) => (
                    <div 
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={() => handleDragOver(index)}
                        onDragEnd={handleDragEnd}
                        key={index} 
                        className={`inline-flex items-center ${
                            dragOverIndex === index ? 'drag-over' : ''
                          }`}>
                        {element}
                        <img src={close} onClick={() => removeRow(index)} className="w-[8%] h-[8%] min-w-[1.5rem] cursor-pointer" />
                    </div>
                ))}
                
            </div>
        </div>
    )

}