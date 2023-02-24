import { Component, useState } from 'react';

interface KnobProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  minAngle: number,
  maxAngle: number;
}

interface State {
  angle: number;
}

const defaultProps = {
  min: 0,
  max: 100,
  value: 30,
  minAngle: 30,
  maxAngle: 330,
}

export default function Knob (props: KnobProps) {
  let [value, setValue] = useState<number>(props.value);


  const valueToAngle = (value: number) => {
    const range = props.max - props.min;
    const percent = (value - props.min) / range;
    const angle = percent * (props.maxAngle - props.minAngle) + props.minAngle;
    return angle;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { movementX, movementY } = event;
    let newValue = Math.min(props.max, Math.max(movementY + value, props.min));
    setValue(newValue);
    props.onChange(value);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const knobStyle = {
      width: "20em",
      height: "20em",
      borderRadius: '50%',
      backgroundColor: 'gray',
      position: 'relative',
      cursor: 'pointer',
    } as React.CSSProperties;
    
    const lineStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: "10em",
      height: 1,
      transform: `rotate(${valueToAngle(value)}deg)`,
      transformOrigin: 'left',
      backgroundColor: 'white',
    } as React.CSSProperties;

    const textStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      fontSize: 10,
      color: 'white',
    } as React.CSSProperties;

    return (
        <div style={knobStyle} onMouseDown={handleMouseDown}>
        <div style = {lineStyle} />
        <div style = {textStyle}>{value}</div>
      </div>
    );
  
}

Knob.defaultProps = defaultProps;