import {isChrome, isChromium, isDesktop, isFirefox, isOpera} from "react-device-detect";

export const userIsSupported = (): boolean => {
    return deviceIsSupported() && browserIsSupported();
}

export const deviceIsSupported = (): boolean => {
    return isDesktop;
}

export const browserIsSupported = (): boolean => {
    return (isChrome || isChromium || isFirefox || isOpera);
}