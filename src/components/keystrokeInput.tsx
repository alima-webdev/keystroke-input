// React
import { ChangeEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useEffect, useImperativeHandle, useRef, useState } from "react";

// Utils
import { getKeystrokeDisplayValue, isValidKeystroke, Keystroke } from "./keystrokeInputUtils";

// Types
type KeystrokeInputProps = {
    className?: string,
    name: string,
    onChange?: ((event: ChangeEvent<Element> | Keystroke | null) => void) | undefined,
    value?: any
}
const KeystrokeInput = forwardRef(({ className = "", onChange = () => { }, ...props }: KeystrokeInputProps, ref) => {

    // Refs
    // const inputValueRef = ref !== null ? ref : useRef<HTMLInputElement>(null)
    const inputValueRef = useRef<HTMLInputElement>(null)

    // States
    const [formValue, setFormValue] = useState<Keystroke | null>(null)

    // Events
    const onKeyEventHandler: KeyboardEventHandler = (event: KeyboardEvent) => {

        // Ignore repeat
        if (event.repeat) return;

        // Get the keys
        const { altKey, ctrlKey, metaKey, shiftKey, code } = event

        // Create the keystroke object
        const keystroke: Keystroke = { altKey, ctrlKey, metaKey, shiftKey, code }

        // Check if the keystroke is valid
        if (!isValidKeystroke(code)) return;

        // Set the form value
        setFormValue(keystroke)

        // Prevent default
        event.preventDefault()

    }

    useEffect(() => {

        // Trigger external events
        if (Object.keys(props).findIndex(val => val === "value") >= 0) {
            onChange(formValue)
        } else {
            const changeEvent = {
                target: inputValueRef.current,
                currentTarget: inputValueRef.current,
                type: "change",
                nativeEvent: null,
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            onChange(changeEvent)
        }

    }, [formValue])

    // Expose the inputValueRef to the parent ref
    useImperativeHandle(ref, () => inputValueRef.current as HTMLInputElement);

    // TEST
    return (
        <>
            {/* Value */}
            <input size={70} type="hidden" ref={inputValueRef} {...props} value={formValue ? JSON.stringify(formValue) : ""} />
            {/* Display */}
            <input className={className}
                onKeyDown={onKeyEventHandler}
                onKeyUp={onKeyEventHandler}
                value={formValue ? getKeystrokeDisplayValue(formValue) : ""}
                onChange={() => { }}
            />
        </>
    )
})

export default KeystrokeInput