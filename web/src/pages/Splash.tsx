import * as React from 'react'
import BorderedContainer from '../ui/BorderedContainer'

export function Splash() {
    return (
        <div className={"w-full p-10"}>
        <BorderedContainer className={"flex justify-center px-8 py-8 text-left text-base"}>
        <article className={"prose prose-white prose-invert"}>
        This open-source development project is dedicated to the performance of microtonal music.
        The project incorporates multiple elements to this effect, including a standalone desktop
        software synthesizer and a browser application that allow microtonal playback. This project
        began as an effort to fulfill Easley Blackwood's wish to hear a live performance of his Twelve
        Microtonal Etudes (1980), but the project also has the potential to inspire performances of
        other existing microtonal works and the creation of new works.
        On this website, you can learn about the project, its elements, and the team members under the Learn tab,
        you can test out some elements of microtonality in your browser under the Play tab, and you can access the
        source code to different elements of the project, including the desktop and browser
        applications under the Download tab. Feel free to get in touch with us if you have any issues or inquiries.
        Our information can be found under the Contact tab.
        <br></br>
        Richard Leinecker and William R. Ayers, University of Central Florida
        </article>
        </BorderedContainer>
        </div>
    )
}