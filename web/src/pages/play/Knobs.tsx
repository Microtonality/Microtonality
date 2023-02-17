import { Component } from 'react';

interface Props {
  size: number;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

interface State {
  angle: number;
}

class Knob extends Component <Props, State> {
  private readonly radius: number;
  private readonly center: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      angle: this.getValueAngle(props.value),
    };

    this.radius = props.size / 2;
    this.center = this.radius;
  }

  private getValueAngle(value: number) {
    const { min, max } = this.props;
    const range = max - min;
    const percent = (value - min) / range;
    const angle = percent * 360;
    return angle;
  }

  private getAngleValue(angle: number) {
    const { min, max } = this.props;
    const range = max - min;
    const percent = angle / 360;
    const value = min + percent * range;
    return value;
  }

  private handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (event: MouseEvent) => {
    const { onChange } = this.props;
    const { pageX, pageY } = event;
    const dx = pageX - this.center;
    const dy = pageY - this.center;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 360;
    this.setState({ angle });
    const value = this.getAngleValue(angle);
    onChange(value);
  };

  private handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  render() {
    const { size, value } = this.props;
    const { angle } = this.state;

    const knobStyle = {
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: 'gray',
      position: 'relative',
      cursor: 'pointer',
    };

    const lineStyle = {
      position: 'absolute',
      top: this.center,
      left: this.center,
      width: this.radius,
      height: 1,
      transform: `rotate(${angle+20}deg)`,
      transformOrigin: 'left',
      backgroundColor: 'white',
    };

    const textStyle = {
      position: 'absolute',
      top: this.center - 10,
      left: this.center - 20,
      fontSize: 10,
      color: 'white',
    };

    return (
        <div style = {knobStyle} onMouseDown={this.handleMouseDown}>
        <div style = {lineStyle} />
        <div style = {textStyle}>{value.toFixed(2)}</div>
      </div>
    );
  }
}

export default Knob;