// Imports
import { Keystroke, isMainKeyValid } from "./keystroke";

/**
 * List the names of all custom events used in the keystroke input
 */
export const keystrokeInputEvents = {
    change: "keystrokechange"
}

/**
 * @classdesc Class used to define the custom HTML element
 * @class
 * @name InputKeystroke
 * 
 * @param {Keystroke} keystrokeValue
 * 
 * @property {string} toString
 * @property {string} toJSON
 * 
 * @method connectedCallback
 * @method handleKeyDownEvent
 * @method handleKeyUpEvent
 * @method bypassEvent
 * @method disconnectedCallback
 */
export class InputKeystroke extends HTMLInputElement {
    keystrokeValue: Keystroke;

    constructor() {
        super()
    }

    /** 
     * @description Triggered when the element is created. Used to add the event listeners
     * @method connectedCallback()
     * @returns
    */
    connectedCallback() {
        this.addEventListener('keyup', this.handleKeyUpEvent)
        this.addEventListener('keydown', this.handleKeyDownEvent)
        this.addEventListener('keypress', this.bypassEvent)
        this.setAttribute("readonly", "true");
    }
    /**
     * @method handleKeyDownEvent
     * @description Main function used to process the keystrokes
     * @param {KeyboardEvent} ev
     * @returns {boolean}
    */
    handleKeyDownEvent(ev: KeyboardEvent) {
        if (ev.repeat) return;
        // log("KeyDown")

        // Get the keystroke and construct the class
        const key = isMainKeyValid(ev.code) ? ev.code.replace(/Key|Digit/gi, "") : "";
        const isAlt = ev.altKey;
        const isCtrl = ev.ctrlKey;
        const isMeta = ev.metaKey;
        const isShift = ev.shiftKey;

        const keystroke = new Keystroke();
        keystroke.modifiers = {
            alt: isAlt,
            ctrl: isCtrl,
            meta: isMeta,
            shift: isShift,
        };
        keystroke.key = key;

        // Set the element value
        this.value = keystroke.toString();
        this.keystrokeValue = keystroke;

        // Dispatch the change event
        const keystrokeChangeEvent: CustomEvent = new CustomEvent(keystrokeInputEvents.change, { detail: { keystroke: this.keystrokeValue } })
        this.dispatchEvent(keystrokeChangeEvent)

        // Prevent the default behavior
        ev.preventDefault();
        ev.stopImmediatePropagation();
        return false;
    }
    /**
     * @description Used to remove the focus from the input element
     * @method handleKeyUpEvent
     * @param {KeyboardEvent} ev
     * @returns {boolean}
     */
    handleKeyUpEvent(ev: KeyboardEvent) {
        // log("KeyUp")
        this.blur();
        ev.preventDefault();
        ev.stopImmediatePropagation();
        return false;
    }
    /**
     * @description Used as a bypass for events that will not be used
     * @method bypassEvent
     * @param {KeyboardEvent} ev
     * @returns {boolean}
     */
    bypassEvent(ev: KeyboardEvent) {
        // log("Press")
        ev.preventDefault();
        ev.stopImmediatePropagation();
        return false;
    }
    /**
     * @description Triggered when the element is removed. Used to remove the event listeners
     * @method disconnectedCallback()
     * @returns
    */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyUpEvent)
        this.removeEventListener('keydown', this.handleKeyDownEvent)
        this.removeEventListener('keypress', this.bypassEvent)
    }
}

/**
 * @description Define the custom HTML element based on the HTMLInputElement
 * @example
 * Set the "is" attribute as "input-keystroke" on the desired input tag to make it a keystroke input
 * Example:
 * <input is="input-keystroke" />
 */
document.addEventListener('DOMContentLoaded', (ev: Event) => {
    customElements.define("input-keystroke", InputKeystroke, { extends: "input" });
})