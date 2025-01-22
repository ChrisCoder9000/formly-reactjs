# Formly React SDK

[![npm version](https://badge.fury.io/js/formly-reactjs.svg)](https://badge.fury.io/js/formly-reactjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful and flexible form builder SDK for React applications with built-in validation, multi-step forms, and customizable UI components.

## Features

- 🚀 Multi-step form support
- ✨ Customizable UI components
- 📝 Built-in validation
- 🎨 Themeable and styleable
- 🔄 Form state management
- 📱 Responsive design
- 🎯 TypeScript support

## Installation

```bash
npm install formly-reactjs
# or
yarn add formly-reactjs
```

## Quick Start

```jsx
import { Builder } from "formly-reactjs";

const steps = [
  {
    title: "Personal Information",
    fields: [
      {
        name: "fullName",
        type: "text",
        label: "Full Name",
        validators: [{ name: "required" }],
      },
    ],
  },
];

function App() {
  return (
    <Builder
      steps={steps}
      title="Registration Form"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## Documentation

### Components

#### `<Builder />`

The main component for creating multi-step forms.

| Prop          | Type                  | Required | Description         |
| ------------- | --------------------- | -------- | ------------------- |
| `steps`       | `Step[]`              | Yes      | Array of form steps |
| `title`       | `string`              | No       | Form title          |
| `description` | `string`              | No       | Form description    |
| `className`   | `string`              | No       | Custom CSS class    |
| `onSubmit`    | `(data: any) => void` | Yes      | Submit callback     |

#### Step Configuration

```typescript
interface Step {
  title?: string;
  description?: string;
  fields: Field[];
}
```

#### Field Configuration

```typescript
interface Field {
  name: string;
  type: 'text' | 'select' | 'number' | /* other types */;
  label?: string;
  placeholder?: string;
  validators?: Validator[];
  // ... other field properties
}
```

### Validation

Built-in validators include:

- required
- minLength
- maxLength
- pattern
- custom

Example:

```javascript
{
  name: "email",
  type: "text",
  validators: [
    { name: "required", errorMessage: "Email is required" },
    { name: "pattern", value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
  ]
}
```

## Styling

The package uses Tailwind CSS by default but can be customized using:

- Custom CSS classes
- Theme configuration
- Style overrides

## Advanced Usage

### Custom Field Types

[Documentation coming soon]

### Custom Validation

[Documentation coming soon]

### Theming

[Documentation coming soon]

## Contributing

We welcome contributions! Please see our contributing guidelines for details.

## License

MIT © [Your Name]

## Support

- Documentation: [Link to docs]
- Issues: [GitHub Issues]
- Discord: [Discord Invite Link]
