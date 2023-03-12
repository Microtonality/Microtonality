import * as React from "react";
import BorderedContainer from '../ui/BorderedContainer'

export function Contact() {
    return(
        <div className={"w-full p-10"}>
        <BorderedContainer className={"flex justify-center px-8 py-8 text-left text-base"}>
        <article className={"prose prose-white prose-invert"}>
        Dr. Ayers:
        <br></br>
        William.Ayers@ucf.edu
        <br></br>
        <br></br>
        Dr. Leinecker:
        <br></br>
        Richard.Leinecker@ucf.edu
        </article>
        </BorderedContainer>
        </div>
    )
}