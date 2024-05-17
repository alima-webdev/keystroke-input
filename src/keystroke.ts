// Types
import { KeystrokeModifiers } from "./global";

// Imports
import { modifierLabels } from "./utils";

/**
 * @classdesc Class used to store and operate keystroke values
 * @class
 * @name Keystroke
 * 
 * @param {alt: boolean, ctrl: boolean, meta: boolean, shift: boolean} modifiers
 * @param {string} key
 * 
 * @constructor
 * @param {KeystrokeModifiers} modifiers
 * @param {string} key
 * 
 * @property {string} toString
 * @property {string} toJSON
 * 
 * @method validateAgainst
 */
export class Keystroke {
    
    modifiers: KeystrokeModifiers = {
        alt: false,
        ctrl: false,
        meta: false,
        shift: false,
    };
    key: string = "";

    /**
     * @constructor
     * @param {KeystrokeModifiers} modifiers
     * @param {string} key
    */
    constructor(modifiers?: KeystrokeModifiers, key?: string) {
        if (modifiers) this.modifiers = modifiers
        if (key) this.key = key
    }

    /**
     * @description Obtain a string representation of the keystroke
     * @property {string} toString
     */
    toString(): string {
        let modifiers = "";
        if (this.modifiers.alt) modifiers += modifierLabels?.alt + " ";
        if (this.modifiers.ctrl) modifiers += modifierLabels?.ctrl + " ";
        if (this.modifiers.meta) modifiers += modifierLabels?.meta + " ";
        if (this.modifiers.shift) modifiers += modifierLabels?.shift + " ";
        const strKeystroke = modifiers + this.key;
        return strKeystroke;
    }
    /**
     * @description Convert the keystroke into a JSON object
     * @property {string} toJSON
     */

    toJSON(): string {
        const data = {
            modifiers: this.modifiers,
            key: this.key,
        };
        return JSON.stringify(data);
    }

    /**
     * @description Validates a keyboard event against a keystroke to determine if they match
     * @method validateAgainst
     * @param {KeyboardEvent} ev
     * @returns {boolean}
     */
    validateAgainst(ev: KeyboardEvent): boolean {
        return (
            ev.altKey == this.modifiers.alt &&
            ev.ctrlKey == this.modifiers.ctrl &&
            ev.metaKey == this.modifiers.meta &&
            ev.shiftKey == this.modifiers.shift &&
            ev.code == "Key" + this.key.toUpperCase()
        );
    }
}

/**
 * Get a string representation of the keystroke and creates a Keystroke class
 * @function keystrokeFromString
 * @param {string} keystrokeString
 * @returns {Keystroke}
 */
export function keystrokeFromString(keystrokeString: string): Keystroke {
    console.log("Fn: Keystroke.fromString");
    const keystroke = new Keystroke();
    keystroke.modifiers.alt =
        keystrokeString.includes(modifierLabels!.alt) ||
            keystrokeString.includes("Alt")
            ? true
            : false;
    keystroke.modifiers.ctrl =
        keystrokeString.includes(modifierLabels!.ctrl) ||
            keystrokeString.includes("Ctrl")
            ? true
            : false;
    keystroke.modifiers.meta =
        keystrokeString.includes(modifierLabels!.meta) ||
            keystrokeString.includes("Meta")
            ? true
            : false;
    keystroke.modifiers.shift =
        keystrokeString.includes(modifierLabels!.shift) ||
            keystrokeString.includes("Shift")
            ? true
            : false;
    keystroke.key = keystrokeString.split("").at(-1) || "";
    return keystroke;
}

/**
 * Determine if the main key being pressed is a valid final key or a modifier
 * @function isMainKeyValid
 * @param {string} key
 * @returns {boolean}
 */
const invalidMainKeys = [
    "ShiftLeft",
    "ShiftRight",
    "AltLeft",
    "AltRight",
    "ControlLeft",
    "ControlRight",
    "MetaLeft",
    "MetaRight",
    "ContextMenu",
    "NumLock",
    "ScrollLock",
    "VolumeMute",
    "VolumeDown",
    "VolumeUp",
    "MediaSelect",
    "LaunchApp1",
    "LaunchApp2",
];
export function isMainKeyValid(key: string) {
    let valid = true;
    if (invalidMainKeys.includes(key)) {
        valid = false;
    }
    return valid;
}
