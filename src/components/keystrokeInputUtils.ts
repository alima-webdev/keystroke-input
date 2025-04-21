// Types
export type Keystroke = {
    altKey: boolean,
    ctrlKey: boolean,
    shiftKey: boolean,
    metaKey: boolean,
    code: string,
}

// Display
export function getKeyName(code: string) {
    let name = code.replace(/Key|Digit/g, '')
    if (name.match(/(Meta|Control|Alt|Shift)/g)) {
        name = ""
    }
    return name
}

// Get the display value
export const modifierDictionary = {
    macOS: {
        altKey: "⌥",
        ctrlKey: "⌃",
        metaKey: "⌘",
        shiftKey: "⇧",
    },
    windows: {
        altKey: "Alt",
        ctrlKey: "Ctrl",
        metaKey: "Windows",
        shiftKey: "Shift",
    },
    linux: {
        altKey: "Alt",
        ctrlKey: "Ctrl",
        metaKey: "Super",
        shiftKey: "Shift",
    }
}
function getOS() {
    let os = "windows";
    if (/Windows NT/.test(navigator.userAgent)) {
        os = "windows";
    } else if (/Mac OS X/.test(navigator.userAgent)) {
        os = "macOS";
    } else if (/Linux/.test(navigator.userAgent)) {
        os = "linux";
    }
    return os
}
function getModifierDictionary() {
    const os = getOS()
    return Object.keys(modifierDictionary).includes(os) ? modifierDictionary[os as keyof typeof modifierDictionary] : modifierDictionary.windows
}
export function getKeystrokeDisplayValue(keystroke: Keystroke) {
    const modifiers = getModifierDictionary()
    let keys = []
    if (keystroke.ctrlKey) keys.push(modifiers.ctrlKey)
    if (keystroke.metaKey) keys.push(modifiers.metaKey)
    if (keystroke.shiftKey) keys.push(modifiers.shiftKey)
    if (keystroke.altKey) keys.push(modifiers.altKey)
    let keyName = getKeyName(keystroke.code)
    keys.push(keyName)
    return keys.join(" ")
}

// Check if the keystroke is valid
const modifierKeyList = [
    "Shift",
    "Alt",
    "Control",
    "Meta",
    "ContextMenu",
    "NumLock",
    "ScrollLock",
    "VolumeMute",
    "VolumeDown",
    "VolumeUp",
    "MediaSelect",
    "LaunchApp1",
    "LaunchApp2",
]
export function isValidKeystroke(code: string) {
    let mainKey = true;

    if (modifierKeyList.findIndex(modifier => code.includes(modifier)) > -1) {
        mainKey = false;
    }
    return mainKey;
}