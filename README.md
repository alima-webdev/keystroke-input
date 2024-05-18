# Keystroke Input Element
A custom input element that handles keystrokes. Created as a custom HTML element using Web Components.

## Installation

### Using NPM
To install this custom input element in your project, use the npm command:

```bash
npm install keystroke-input
```

Import it into your javascript file
```javascript
import "keystroke-input"

...
```

### Without NPM

Clone the Github repository into your project's directory

```bash
git clone https://github.com/alima-webdev/keystroke-input.git
```

Add the input tag and javascript file to your project's HTML file
```html
<!-- Use the attribute is="input-keystroke" on the desired input tag -->
<input id="keystroke" is="input-keystroke" />

<!-- Import the js file from the dist folder -->
<script src="./dist/keystroke-input.js"></script>
```

## Usage
Listen to the keystrokechange event to obtain the user's keystroke
```javascript
document.getElementById("keystroke").addEventListener("keystrokechange", (event) => {
    const keystroke = event.detail.keystroke
    ...
})
```

The keystroke object is formatted as:
```javascript
{
    modifiers: {
        alt: boolean,
        ctrl: boolean,
        meta: boolean,
        shift: boolean
    },
    key: string
}
// It also contains the functions toString(), toJSON(), and validateAgainst(event: KeyboardEvent)
```

## License
This project is released under the GNU GENERAL PUBLIC license. See the [LICENSE](./LICENSE) file for more details.
