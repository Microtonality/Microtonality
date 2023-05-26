import * as React from "react";
import {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from "react";
import {MCActions} from "../../Reducers";
import {Scale} from "../../../../utility/microtonal/Scale";
import Popup from "../../../../ui/Popup";
import SettingsFieldTitle from "../SettingsFieldTitle";
import {EQUAL_TEMPERED_SCALES, matchesEqualTemperedScale} from "../../../../utility/microtonal/ScaleGeneration";

interface EqualTemperedScaleSliderProps {
    scale: Scale;
    mcDispatch: Function;
}

export default function EqualTemperedScaleSlider(props: EqualTemperedScaleSliderProps) {

    const [value, setValue] = useState<number>(12);
    const [displayValuePopup, setDisplayValuePopup] = useState<boolean>(false);
    const [popupPosition, setPopupPosition] = useState<string>('0px');
    const sliderInputRef: MutableRefObject<HTMLInputElement> = useRef(null);
    let min = 12;
    let max = 32;

    useEffect(() => {
        if (matchesEqualTemperedScale(props.scale)) {
            let val: number = props.scale.notes.length
            setValue(val);
            setPopupPosition(getNextPopupPosition(val - min));
        }
    }, [props.scale]);

    const wrapSetValue = (event: ChangeEvent<HTMLInputElement>) => {
        let val: number = Number(event.target.value);

        setValue(val);
        setPopupPosition(getNextPopupPosition(val - min));
    }

    const beginAdjustment = () => {
        setDisplayValuePopup(true);
    }

    const endAdjustment = () => {
        setDisplayValuePopup(false);
        handleRangeChange();
    }

    const handleRangeChange = () => {
        let newScale: Scale = EQUAL_TEMPERED_SCALES.at(value - min);
        if (newScale === props.scale)
            return;

        props.mcDispatch({type: MCActions.SET_SCALE, scale: newScale});
    };

    // I'm not sure why this works so nicely. -Calvin
    // Simplified from: https://codepen.io/chriscoyier/pen/eYNQyPe
    const getNextPopupPosition = (step: number): string => {
        let size: number = max - min;

        // Since the size of this slider is 20 we get clean
        // increments of 5. (ex: 5%, 10%, 15%, ...)
        let newPercentage: string = `${(step * 100) / size}%`;

        // Move back some pixels based on the current step.
        let newOffset: string = `${-step}px`;

        return `calc(${newPercentage} + ${newOffset})`;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
            sliderInputRef.current.blur();
    };

    return (
        <div className={'flex flex-col mb-4'}>

            <SettingsFieldTitle text={'EQUAL-TEMPERED SCALE GENERATOR'} />
            <div className={'relative'}>
                <input
                    ref={sliderInputRef}
                    className={'appearance-none w-full h-2 accent-neutral-200 cursor-pointer rounded-lg bg-bgdark border border-neutral-500 outline-0'}
                    type={'range'}
                    step={1}
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) => wrapSetValue(e)}
                    onFocus={() => beginAdjustment()}
                    onBlur={() => endAdjustment()}
                    onMouseDown={() => beginAdjustment()}
                    onMouseUp={() => endAdjustment()}
                    onKeyDown={(e) => handleKeyDown(e)}
                />

                <div className={'absolute -mx-2 -mt-14'}
                     style={{ left: popupPosition }}
                >
                    <Popup
                        text={value.toString()}
                        visible={displayValuePopup}
                    />
                </div>
            </div>

        </div>
    );
};