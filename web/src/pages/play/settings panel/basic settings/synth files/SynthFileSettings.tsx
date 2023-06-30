import * as React from "react";
import {useState} from "react";
import SynthFileSettingsPopup from "./SynthFileSettingsPopup";
import SVGButton, {SVGButtons} from "../../elements/SVGButton";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export default function SynthFileSettings(): ReactJSXElement {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <SVGButton
                svg={SVGButtons.cog6tooth}
                onClick={() => setVisible(true)}
            />

            <SynthFileSettingsPopup
                visible={visible}
                setVisible={setVisible}
            />
        </>
    );
}