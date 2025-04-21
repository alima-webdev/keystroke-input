# Keystroke Input Component for React

A lightweight and customizable React component that captures and displays user keystrokes in real-time. Perfect for keyboard shortcut editors, typing games, or accessibility tools.

## Features

- Real-time keystroke capturing
- Customizable display and behavior
- Easy integration with any React project
- Supports modifier keys (Ctrl, Alt, Shift, etc.)

## Installation

```bash
npm install keystroke-input
# or
yarn add keystroke-input
```

## Usage

```jsx
import KeystrokeInput from 'keystroke-input';

function App() {
  return (
    <div>
      <h2>Press any key</h2>
      <KeystrokeInput />
    </div>
  );
}
```

## Example

Visual input display
```
Windows: Ctrl + Shift + A
or
MacOS: ⌘ ⇧ A
```

Actual field value
```json
{
    "altKey": false,
    "ctrlKey": false,
    "metaKey": true,
    "shiftKey": true,
    "code": "KeyA"
}
```

## Styling

The component comes with minimal styling. You can easily customize it via CSS or by passing a custom `className` or using Tailwind classes.

## Development

Clone the repo and run locally:

```bash
git clone https://github.com/alima-webdev/keystroke-input.git
cd keystroke-input
npm install
npm run dev
```

## License

GPL-3.0 © [](https://github.com/alima-webdev)