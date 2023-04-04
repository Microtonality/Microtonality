import * as React from "react";
import BorderedContainer from '../ui/BorderedContainer'

export function Download() {
    return (
        <div className={"w-full p-10"}>
        <BorderedContainer className={"flex justify-center px-8 py-8 text-left text-base"}>
        <article className={"prose prose-white prose-invert"}>
        The most recent release of the desktop synthesizer and the source code for both the desktop 
        and browser synthesizer projects can be found at the link below. 
        <br></br>
        <br></br>
        <a href="https://github.com/Microtonality/Microtonality" 
        className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">
            https://github.com/Microtonality/Microtonality</a>
        </article>
        </BorderedContainer>
        </div>
    )
}