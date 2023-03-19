import * as React from 'react'
import {useEffect, useRef, useState} from 'react';

interface KnobProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  minAngle?: number;
  maxAngle?: number;
  className: string;
  knobLabel: string;
}

const defaultProps = {
  min: 0,
  max: 1,
  value: 0,
  minAngle: 30,
  maxAngle: 330,
  className: "w-96",
  knobLabel: "Label"
}

export default function Knob (props: KnobProps) {
  let [value, setValue] = useState<string>(props.value.toFixed(2));
  let [isMouseDown, setIsMouseDown] = useState(false);
  const valueInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isMouseDown) {
      handleSubmit();
    }
  }, [isMouseDown]);

  useEffect(() => {
    setValue(props.value.toString());
  }, [props.value]);


  const valueToAngle = (value: number) => {
    const range = props.max - props.min;
    const percent = (value - props.min) / range;
    const angle = percent * (props.maxAngle - props.minAngle) + props.minAngle;
    return angle-180;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    setIsMouseDown(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { movementX, movementY } = event;
    setValue((prevValue) => {
      return Math.min(props.max, Math.max(props.min, (movementX/(100/props.max)) + (-1)*(movementY/(100/props.max)) + parseFloat(prevValue))).toFixed(2);
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsMouseDown(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setValue('');
      return;
    }

    let val: number = Math.abs(parseFloat(event.target.value));
    if (val > props.max) val = props.max;
    setValue(val.toString());
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      valueInputRef.current.blur();
      handleSubmit();
      return;
    }
  }

  const handleSubmit = () => {
    props.onChange(parseFloat(value));
  }

    return (
      <div className={`flex flex-col min-h-[96%] w-full justify-around items-center bg-neutral-700 rounded-xl ${props.className}`}>

        <div className="flex w-[7rem] justify-center">
          <a className="2xl:text-xl xl:text-lg md:text-sm sm:text-xs font-agrandir-wide uppercase px-5 py-3 rounded block leading-normal text-center text-white">{props.knobLabel}</a>
        </div>

        <div className={"aspect-square rounded-full p-2 bg-gradient-to-b from-neutral-500 to-neutral-900 flex w-3/4"} onMouseDown={(e) => handleMouseDown(e)}>
          <div className={"w-full h-full rounded-full p-0.5 bg-gradient-to-b from-stone-700 to-neutral-800 flex-1"} >
            <div style={{transform: `rotate(${valueToAngle(parseFloat(value))}deg)`}} className={"w-full h-full flex items-start justify-center"}>
              <div className={"w-2.5 h-2.5 rounded-full bg-black"}>
              </div>
            </div>
          </div>
        </div>

        <input className={"text-center self-center w-3/4 rounded-md font-agrandir"} type="number" ref={valueInputRef} value={(value === '') ? '' : parseFloat(value)} onChange={(e) => handleInput(e)} onBlur={() => handleSubmit()} onKeyDown={(e) => handleKeyDown(e)} min={0} max={1} step={0.01} />
      </div>
    );
}

Knob.defaultProps = defaultProps;