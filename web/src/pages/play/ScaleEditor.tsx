import * as React from "react";
import {ScaleConfig} from "../../utility/MicrotonalConfig";
import { useEffect, useState } from "react";

import hamburger from "../../ui/icons/hamburger.png"
import close from "../../ui/icons/close.png"

export default function ScaleEditor(props:{scaleConfig: ScaleConfig}) {

    const [key, setKey] = useState(1)

    const [scaleMap, setScaleMap] = useState<Map<number, JSX.Element>>(new Map([[0, <ScaleEditorInput key={0} value={0}/>]]))
    

    function ScaleEditorInput(props:{ key: number, value: number }) {

        return (
            <div className="inline-flex items-center mt-[5%]">
                <img src={hamburger} className="w-[6%] min-w-[1.5rem] cursor-pointer"/>
    
                <label htmlFor={key.toString()} className="inline-flex flex-wrap items-center cursor-pointer text-gray-800 w-[50%] h-10 text-center ml-[1%] min-w-[6rem]">
                    <input id={key.toString()} type="checkbox" className="hidden peer" />
                    <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-gold peer-checked:bg-white rounded-l-md border-r-[1px] border-black pt-[4%] min-w-[3rem]">CENTS</div>
                    <div className="2xl:text-lg md:text-sm sm:text-xs w-[50%] h-full bg-white peer-checked:bg-gold rounded-r-md border-l-[1px] border-black pt-[4%] min-w-[3rem]">RATIO</div>
                </label>
    
                <div className="flex w-full h-10 ml-[1%] max-w-[50%]">
                    <input type="number" step="0.0001" value={props.value} onChange={setValue} className="w-full rounded-md font-agrandir pl-[2%] min-w-[3rem]" />
                </div>
     
                <img src={close} i-key={key} onClick={removeScale} className="w-[10%] min-w-[1.5rem] cursor-pointer" />
            </div>
        )
    }

    function addScale() {
        
        setKey(key + 1)
        let newScale = <ScaleEditorInput key={key} value={0} />
        let newMap = new Map(scaleMap);
        newMap.set(key, newScale)
        setScaleMap(newMap)
    }

    function removeScale(event: React.MouseEvent<HTMLImageElement> ) {
        const idx = parseInt(event.currentTarget.getAttribute('i-key'))
        let newMap = new Map<number, JSX.Element>
        newMap = scaleMap
        newMap.delete(idx)
        setScaleMap(newMap)
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
 
            <div className="flex flex-col mt-[5%]">
                <button onClick={addScale} className="relative m-0 block w-[10%] bg-transparent min-w-0 flex-auto cursor-pointer bg-clip-padding text-2xl text-white">+</button>
                {[...scaleMap.values()]}
                
            </div>
        </div>
    )

}