import * as React from "react";
import BorderedContainer from '../ui/BorderedContainer'

export function Download() {
    return (
        <div className={"w-full p-10"}>
        <BorderedContainer className={"flex justify-center px-8 py-8 text-left text-base"}>
        <article className={"prose prose-white prose-invert"}>
        <a href="https://github.com/Microtonality/Microtonality" 
        className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">
            Click here to be redirectred to Github</a>
        </article>
        </BorderedContainer>
        </div>
    )
}