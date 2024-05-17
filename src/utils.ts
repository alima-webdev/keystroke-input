/**
 * @description Get the OS being used by the client
 * @function getOS
 * @returns {number} OS
 * 
 * @example
 * Set one of the following as the user agent to test the regex for different OS types
 * `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246`
 * `Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1`
 * `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9`
 */
const OS = {
    Unknown: 0,
    Mac: 1,
    Windows: 2,
    Linux: 3,
}
const userAgentRegex: RegExp = /Mac|Windows|Linux/gi
function getOS(): number {
    const ua = window.navigator.userAgent as string

    let deviceOS: number = OS.Unknown
    const uaOS = ua.match(userAgentRegex)![0].toLowerCase();

    if (!uaOS) return deviceOS

    switch (uaOS) {
        case "mac":
            deviceOS = OS.Mac
            break;
        case "windows":
            deviceOS = OS.Windows
            break;
        case "linux":
            deviceOS = OS.Linux
            break;
    }
    return deviceOS
}

/**
 * @description Return the modifier string label according to the device's OS
 * @function getModifierLabels
 * @returns {alt: string, ctrl: string, meta: string, shift: string}
 */
const lbModifiersMac = {
    alt: "⌥",
    ctrl: "⌃",
    meta: "⌘",
    shift: "⇧",
};
const lbModifiersWindows = {
    alt: "Alt",
    ctrl: "Ctrl",
    meta: "Windows",
    shift: "Shift",
};
const lbModifiersLinux = {
    alt: "Alt",
    ctrl: "Ctrl",
    meta: "Super",
    shift: "Shift",
};
function getModifierLabels(): any {
    switch (getOS()) {
        case OS.Mac:
            return lbModifiersMac;
            break;
        case OS.Windows:
            return lbModifiersWindows;
            break;
        case OS.Linux:
            return lbModifiersLinux;
            break;
    }
}

/**
 * @description Export the main outcome of this file, the modifier labels obtained based on the client's OS
 * @param {alt: string, ctrl: string, meta: string, shift: string} modifierLabels
 */
export const modifierLabels = getModifierLabels();