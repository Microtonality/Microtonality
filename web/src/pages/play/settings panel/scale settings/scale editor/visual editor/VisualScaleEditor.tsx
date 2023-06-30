import * as React from "react";
import {useState} from "react";
import Button from "../../../../../../ui/Button";
import BaseNoteInput from "./note input/BaseNoteInput";
import DraggableNoteList from "./note list/DraggableNoteList";
import SettingsFieldTitle from "../../../elements/SettingsFieldTitle";
import OctaveNoteInput from "./note input/OctaveNoteInput";
import {Scale} from "../../../../../../utility/microtonal/Scale";
import {useMCDispatch, useScale} from "../../../../PlayProvider";
import {RatioNote, ScaleNote} from "../../../../../../utility/microtonal/notes";
import {averageNotes} from "../../../../../../utility/microtonal/notes/ScaleNoteUtility";
import {MCActions} from "../../../../Reducers";
import ScaleEditorTabSwitcher from "../ScaleEditorTabSwitcher";
import ScalaFileSettingsPopup from "../../scala files/ScalaFileSettingsPopup";
import SVGButton, {SVGButtons} from "../../../elements/SVGButton";
import Animator from "../../../elements/animations/Animator";
import {FadeInAndOut, GrowY} from "../../../elements/animations/Animations";
import {BaseRatioNote} from "../../../../../../utility/microtonal/notes/RatioNote";
import {BaseCentNote} from "../../../../../../utility/microtonal/notes/CentNote";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function VisualScaleEditor(): ReactJSXElement {

    const scale: Scale = useScale();
    const mcDispatch: Function = useMCDispatch();

    const getBaseNote = (): ScaleNote => {
        if (scale.notes.length <= 1)
            return (scale.octaveNote instanceof RatioNote) ? BaseRatioNote : BaseCentNote;

        return (scale.notes.at(1) instanceof RatioNote) ? BaseRatioNote : BaseCentNote;
    }
    const [baseNote, setBaseNote] = useState<ScaleNote>(getBaseNote());
    const [displayScaleSettings, setDisplayScaleSettings] = useState<boolean>(false);

    // Insert a new note at the end of the scale,
    // averaging the last note and the octave note.
    const handleAddNote = (): void => {
        let newNote: ScaleNote;
        let notes: ScaleNote[] = scale.notes;

        if (notes.length === 1) {
            newNote = averageNotes(baseNote, scale.octaveNote);
        }
        else {
            newNote = averageNotes(notes[notes.length - 1], scale.octaveNote);
        }

        mcDispatch({type: MCActions.ADD_NOTE, note: newNote});
    }

    const flipDisplayScaleSettings = (): void => {
        setDisplayScaleSettings((prev: boolean) => !prev);
    }

    return (
        <div className={'flex flex-col'}>

            <div className={'flex justify-between relative z-10'}>
                <Animator animation={FadeInAndOut}>
                    <SettingsFieldTitle
                        className={'mb-1'}
                        text={'SCALE EDITOR'}
                    />
                </Animator>

                <div className={'flex flex-row'}>
                    <SVGButton
                        svg={SVGButtons.cog6tooth}
                        onClick={flipDisplayScaleSettings}
                    />
                    <ScaleEditorTabSwitcher />
                </div>

                <ScalaFileSettingsPopup
                    visible={displayScaleSettings}
                    setVisible={setDisplayScaleSettings}
                />
            </div>


            <Animator
                className={'w-full h-full flex flex-col'}
                animation={{...GrowY, transition: { duration: 0.4 } }}
            >
                <Button
                    text={'ADD NOTE'}
                    className={'animate-none'}
                    onClick={handleAddNote}
                />

                {/* Notes */}
                <div className={'mt-1.5'}>
                    <BaseNoteInput
                        baseNote={baseNote}
                        setBaseNote={setBaseNote}
                    />

                    <DraggableNoteList
                        baseNote={baseNote}
                    />

                    <div className={'mt-1'}>
                        <SettingsFieldTitle text={'OCTAVE NOTE'} />
                        <OctaveNoteInput key={scale.octaveNote.id} />
                    </div>
                </div>
            </Animator>

        </div>
    );
}