# Keystroke Input
A input element that handles keystrokes. Created as a custom HTML element using Web Components.

## Usage
```
<!-- Use the attribute is="input-keystroke" on the desired input tag -->
<input id="keystroke" is="input-keystroke" />

<!-- Import the js file from the dist folder -->
<script src="./dist/keystroke-input.js"></script>
```

Listen to the keystrokechange event to obtain the user's keystroke
```
document.getElementById("keystroke").addEventListener("keystrokechange", (event) => {
    const keystroke = event.detail.keystroke
    ...
})
```

The keystroke object is formatted as:
```
{
    modifiers: {
        alt: boolean,
        ctrl: boolean,
        meta: boolean,
        shift: boolean
    },
    key: string
}
It also contains the functions toString(), toJSON(), and validateAgainst(event: KeyboardEvent)
```