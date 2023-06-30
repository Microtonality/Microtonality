import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import * as React from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {MutableRefObject} from "react";
import {AnimationMap, FadeInAndOut} from "./Animations";

interface AnimatorProps {
    className?: string;
    clickOutsideRef?: MutableRefObject<any>;
    visible?: boolean;
    animation: AnimationMap;
    children: ReactJSXElement | ReactJSXElement[];
}

export default function Animator(props: AnimatorProps): ReactJSXElement {

    const reducedMotion: boolean = useReducedMotion();
    const animationMap: AnimationMap = (
        (!reducedMotion) ? props.animation : FadeInAndOut
    );

    return (
        <AnimatePresence>
            {(props.visible ?? true) &&
                <motion.div
                    className={props.className}
                    ref={props.clickOutsideRef}
                    initial={...animationMap.initial}
                    animate={animationMap.enter}
                    transition={animationMap.transition}
                    exit={animationMap.exit}
                >
                    {props.children}
                </motion.div>
            }
        </AnimatePresence>
    );
}
