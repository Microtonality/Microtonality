import { Component, useState } from 'react';

interface KnobProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  minAngle: number;
  maxAngle: number;
  className: string;
}

const defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  minAngle: 30,
  maxAngle: 330,
  className: "w-96"
}

export default function Knob (props: KnobProps) {
  let [value, setValue] = useState<number>(props.value);


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
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { movementX, movementY } = event;
    console.log("x" + movementX);
    console.log("y" + movementY);
    setValue((prevValue) =>{
      return Math.min(props.max, Math.max(movementX + movementY + prevValue, props.min))
    });
    props.onChange(value);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

    return (
      <div className={`flex flex-col ${props.className}`}>
        <div className={"aspect-square rounded-full p-2 bg-gradient-to-b from-neutral-500 to-neutral-900 flex items-center justify-center"} onMouseDown={handleMouseDown}>
          <div className={"w-full h-full rounded-full p-0.5 bg-gradient-to-b from-stone-700 to-neutral-800 flex-1"} >
            <div style={{transform: `rotate(${valueToAngle(value)}deg)`}} className={"w-full h-full flex items-start justify-center"}>
              <div className={"w-2.5 h-2.5 rounded-full bg-black"}>
              </div>
            </div>
          </div>
        
      </div>
      <div className={"text-neutral-200 text-center w-full"}>
        {value}
      </div>
      </div>
    );
  
}

Knob.defaultProps = defaultProps;