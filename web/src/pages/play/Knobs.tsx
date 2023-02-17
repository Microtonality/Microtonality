import * as React from "react";
import { Component } from "react";
import  Knob  from "react-simple-knob";

const style = {
  margin: "20%",
  height: "100px",
  fontFamily: "Arial",
  color: "white"
};

export default function Knobs() {

  return (
    <Knob
      name="Volume"
      unit="dB"
      defaultPercentage={0.7}
      onChange={console.log}
      bg="grey"
      fg="gold"
      mouseSpeed={5}
      transform={(p: number) => parseInt(p * 50, 10) - 50}
      style={style} />
  );
}