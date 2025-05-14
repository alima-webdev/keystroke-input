// React
import { ChangeEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useImperativeHandle, useRef, useState } from "react";

// Utils
import { getKeystrokeDisplayValue, isValidKeystroke, Keystroke } from "./keystrokeInputUtils";

// Types
type KeystrokeInputProps = {
    className?: string,
    name: string,
    onChange?: ((event: ChangeEvent<Element> | null) => void) | undefined,
    value?: string
}
const KeystrokeInput = forwardRef(({ className = "", ...props }: KeystrokeInputProps, ref) => {

    // Determine if the input is controlled
    const isControlledInput = props.value ? true : false

    // Refs
    const inputValueRef = useRef<HTMLInputElement>(null)

    // States
    const [valueState, setValueState] = useState<Keystroke | null>(null)

    // Compute the form value
    const formValue = isControlledInput ? JSON.parse(String(props.value)) : valueState

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

        // If there is an onChange prop
        if (props.onChange) {
            if (inputValueRef.current) {
                inputValueRef.current.value = JSON.stringify(keystroke);
            }
            const changeEvent = {
                target: inputValueRef.current,
                currentTarget: inputValueRef.current,
                type: "change",
                nativeEvent: null,
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            props.onChange(changeEvent)
        }

        // Set the form value if the input is not controlled (depends on the component state)
        if (isControlledInput === false) {
            setValueState(keystroke)
        }

        // Prevent default
        event.preventDefault()

    }

    // Expose the inputValueRef to the parent ref
    useImperativeHandle(ref, () => inputValueRef.current as HTMLInputElement);

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