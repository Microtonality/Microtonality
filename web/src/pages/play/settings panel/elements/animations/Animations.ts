import {AnimationControls, TargetAndTransition, Transition} from "framer-motion";

export interface AnimationMap {
    // Typings for this parameter are not exported by framer.
    initial?: any;

    enter?: TargetAndTransition | AnimationControls;
    exit?: TargetAndTransition;
    transition?: Transition;
}

export const InstantTransition: Transition = { type: 'tween', duration: 0 };
export const SpringTransition: Transition = { type: 'spring', stiffness: 200 };

// Animations
export const FadeInAndOut: AnimationMap = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
}

export const ScaleIn: AnimationMap = {
    initial: { scale: 0 },
    enter: { scale: 1 },
}

export const ScaleInAndOut: AnimationMap = {
    initial: { scale: 0 },
    enter: { scale: 1 },
    exit: { scale: 0 },
}

// Note: null values revert to element's original value.
export const GrowX: AnimationMap = {
    initial: { width: 0 },
    enter: { width: null },
}

export const GrowY: AnimationMap = {
    initial: { height: 0 },
    enter: { height: null },
}

export const EnterLeftExitLeft: AnimationMap = {
    initial: { left: -window.innerWidth },
    enter: { left: null },
    exit: { left: -window.innerWidth },
}

export const EnterTopExitTop: AnimationMap = {
    initial: { top: -window.innerHeight },
    enter: { top: null },
    exit: { top: -window.innerHeight },
}
