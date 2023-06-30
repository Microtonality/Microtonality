import * as React from "react";
import {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from "react";
import {MCActions} from "../../Reducers";
import {Scale, scaleAbstractEquals} from "../../../../utility/microtonal/Scale";
import Popup from "../elements/Popup";
import SettingsFieldTitle from "../elements/SettingsFieldTitle";
import {EQUAL_TEMPERED_SCALES} from "../../../../utility/microtonal/ScaleGeneration";
import {useMCDispatch, useScale} from "../../PlayProvider";
import {Transition, useReducedMotion} from "framer-motion";
import {
    AnimationMap,
    FadeInAndOut,
    GrowX,
    InstantTransition, SpringTransition
} from "../elements/animations/Animations";
import Animator from "../elements/animations/Animator";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function EqualTemperedScaleSlider(): ReactJSXElement {

    const scale: Scale = useScale();
    const mcDispatch: Function = useMCDispatch();

    const min: number = 12;
    const max: number = 32;
    const [value, setValue] = useState<number>(12);
    const sliderRef: MutableRefObject<HTMLInputElement> = useRef(null);

    const [displayValuePopup, setDisplayValuePopup] = useState<boolean>(false);
    const [popupPosition, setPopupPosition] = useState<{ left: number }>({ left: 0 });
    const popupTransition: Transition = ((!useReducedMotion()) ? SpringTransition : InstantTransition);
    const popupAnimationMap: AnimationMap = {
        ...FadeInAndOut,
        enter: {...popupPosition, ...FadeInAndOut.enter},
        transition: popupTransition,
    };

    useEffect(() => {
        let val: number = scale.notes.length;
        if (val >= min && scaleAbstractEquals(scale, EQUAL_TEMPERED_SCALES[val - min])) {
            setValue(val);
            setPopupPosition(getNextPopupPosition(val - min));
        }
    }, [scale]);

    const wrapSetValue = (event: ChangeEvent<HTMLInputElement>): void => {
        let val: number = Number(event.target.value);

        setValue(val);
        setPopupPosition(getNextPopupPosition(val - min));
    }

    const beginAdjustment = (): void => {
        setDisplayValuePopup(true);
    }

    const endAdjustment = (): void => {
        setDisplayValuePopup(false);
        handleSliderChange();
    }

    const handleSliderChange = (): void => {
        let newScale: Scale = EQUAL_TEMPERED_SCALES.at(value - min);
        if (scaleAbstractEquals(newScale, scale))
            return;

        mcDispatch({type: MCActions.SET_SCALE, scale: newScale});
    };

    // Adapted from: https://codepen.io/chriscoyier/pen/eYNQyPe
    const getNextPopupPosition = (step: number): { left: number } => {
        let size: number = max - min;
        let percentage: number = step / size;

        let left: number = sliderRef.current.offsetWidth * percentage;

        // Move back some pixels based on the current step.
        left -= step;

        return { left: left };
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter')
            event.currentTarget.blur();
    };

    return (
        <div className={'flex flex-col mb-4'}>

            <Animator animation={FadeInAndOut}>
                <SettingsFieldTitle text={'EQUAL-TEMPERED SCALE GENERATOR'} />
            </Animator>

            <Animator
                className={'relative'}
                animation={GrowX}
            >
                <input
                    className={'appearance-none w-full h-2 accent-neutral-200 cursor-pointer rounded-lg bg-bgdark border border-neutral-500 outline-0'}
                    ref={sliderRef}
                    type={'range'}
                    step={1}
                    min={min}
                    max={max}
                    value={value}
                    onMouseDown={() => beginAdjustment()}
                    onMouseUp={() => endAdjustment()}
                    onFocus={() => beginAdjustment()}
                    onBlur={() => endAdjustment()}
                    onChange={(e) => wrapSetValue(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />

                <Animator
                    className={'absolute -mx-2 -mt-14'}
                    visible={displayValuePopup}
                    animation={popupAnimationMap}
                >
                    <Popup text={value.toString()} />
                </Animator>
            </Animator>

        </div>
    );
};