# Formly React SDK

A modern, type-safe form builder SDK for React applications that makes creating complex forms a breeze. Build beautiful multi-step forms with built-in validation, customizable components, and a delightful developer experience.

![npm version](https://badge.fury.io/js/formly-reactjs.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

[GitHub Repository](https://github.com/ChrisCoder9000/formly-reactjs)

## ✨ Features

- 🎯 **Type-Safe**: Built with TypeScript for robust type checking and better IDE support
- 🚀 **Multi-Step Forms**: Create wizard-like experiences with ease
- 📝 **Smart Validation**: Built-in validators with custom validation support
- 🎨 **Customizable UI**: Pre-built components with optional Tailwind CSS styling
- 🔄 **State Management**: Efficient form state handling out of the box
- 📱 **Responsive**: Mobile-first design approach
- 🎈 **Flexible Styling**: Use our pre-built styles or bring your own

## 📦 Installation

1. Install the core package and its peer dependencies:

```bash
# First, install the correct Tailwind CSS version
npm install tailwindcss@^3.4.0 postcss autoprefixer date-fns input-otp zod react-day-picker

# Then install formly-reactjs
npm install formly-reactjs

# Or using yarn
yarn add tailwindcss@^3.4.0 postcss autoprefixer date-fns input-otp zod react-day-picker
yarn add formly-reactjs

# Or using pnpm
pnpm add tailwindcss@^3.4.0 postcss autoprefixer date-fns input-otp zod react-day-picker
pnpm add formly-reactjs
```

> **Note**: If you encounter peer dependency conflicts, you can use one of these approaches:
>
> 1. Install the specific Tailwind version required (`^3.4.0`)
> 2. Use the `--force` flag: `npm install formly-reactjs --force`
> 3. Use the `--legacy-peer-deps` flag: `npm install formly-reactjs --legacy-peer-deps`

## 🎨 Tailwind CSS Setup

Follow these steps to set up the required styling configuration:

### 1. PostCSS Configuration

Create a `postcss.config.js` file:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 2. Tailwind Configuration

Create a `tailwind.config.js` file, make sure to include the content for telling tailwind where to find the formly-reactjs components and include also the presets:

```javascript
import { tailwindPreset } from "formly-reactjs";

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPreset],
  darkMode: ["class"],
  safelist: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/formly-reactjs/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
};
```

### 3. CSS Setup

Create a CSS file (e.g., `src/styles/globals.css`) and add Tailwind's directives along with the required CSS variables:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Required CSS variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 0 0% 15%; /* Darker, almost black */
  --primary-foreground: 0 0% 98%; /* Almost white for contrast */
  --secondary: 0 0% 93%; /* Light neutral gray */
  --secondary-foreground: 0 0% 20%; /* Dark gray for contrast */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 0 0% 98%; /* Almost white */
  --primary-foreground: 0 0% 15%; /* Almost black for contrast */
  --secondary: 0 0% 20%; /* Dark neutral gray */
  --secondary-foreground: 0 0% 93%; /* Light gray for contrast */
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

Import this CSS file in your application's entry point (e.g., `src/index.tsx` or `src/App.tsx`):

```tsx
import "./styles/globals.css";
```

## 🚀 Quick Start

> **Note**: If you are using Next.js
> in order to use the tailwind dark theme with class method you must install next-themes and wrap your app in the ThemeProvider component.
>
> ```tsx
> import { ThemeProvider } from "next-themes";
>
> export default function App({ Component, pageProps }: AppProps) {
>   return (
>     <ThemeProvider attribute="class">
>       <Component {...pageProps} />
>     </ThemeProvider>
>   );
> }
> ```

```tsx
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
      {
        name: "email",
        type: "text",
        label: "Email",
        validators: [{ name: "required", errorMessage: "Email is required" }],
      },
      {
        name: "password",
        type: "secret",
        label: "Password",
        validators: [
          {
            name: "pattern",
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:
              "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          },
          {
            name: "minLength",
            value: 8,
            errorMessage: "Password must be at least 8 characters long",
          },
        ],
      },
    ],
  },
];

function App() {
  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <Builder steps={steps} title="Registration Form" onSubmit={handleSubmit} />
  );
}
```

## 📖 API Reference

### Builder Component

The main component for creating forms.

```tsx
interface BuilderProps {
  steps: Step[]; // Array of form steps
  title?: string; // Form title
  description?: string; // Form description
  onSubmit: (data: any) => void; // Submit callback
  defaultFormData?: Record<string, string>; // Initial form data
  fieldOverwrites?: FieldOverwrites; // Custom field renderers
  actionsOverwrites?: ActionsOverwrites; // Custom action buttons
  headerOverwrites?: HeaderOverwrites; // Custom header
  formErrorOverwrites?: FormErrorOverwrites; // Custom form error messages
  isButtonLoading?: boolean; // Whether the button is loading
  onStepSubmit?: (args: {
    data: Record<string, string>;
    stepIndex: number;
    errors: FieldErrors;
  }) => Promise<void>; // Custom step submit callback, is pending, the button will be disabled and the loader will be shown
}
```

### Step Configuration

```tsx
interface Step {
  title?: string;
  description?: string;
  fields: Field[];
}
```

### Field Types

```tsx
type FieldType =
  | "text"
  | "select"
  | "number"
  | "textarea"
  | "checkbox"
  | "radio"
  | "date"
  | "block";

interface Field {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  validators?: Validator[];
  options?: Option[]; // For select, radio, etc.
  defaultValue?: any;
}
```

### Default Values

You can set initial values for any field using the `defaultValue` property. The value type should match the field type:

```tsx
// Text field
{
  name: "username",
  type: "text",
  defaultValue: "JohnDoe"
}

// Number field
{
  name: "age",
  type: "number",
  defaultValue: 25
}

// Checkbox field
{
  name: "subscribe",
  type: "checkbox",
  defaultValue: true
}

// Select field
{
  name: "country",
  type: "select",
  options: [
    { label: "USA", value: "us" },
    { label: "UK", value: "uk" }
  ],
  defaultValue: "us"
}

// Date field
{
  name: "birthDate",
  type: "date",
  defaultValue: new Date("1990-01-01")
}

// Block field
{
  name: "addresses",
  type: "blocks",
  defaultValue: [
    {
      street: "123 Main St",
      city: "New York"
    },
    {
      street: "456 Park Ave",
      city: "Los Angeles"
    }
  ],
  fields: [
    {
      name: "street",
      type: "text"
    },
    {
      name: "city",
      type: "text"
    }
  ]
}
```

### Phone Field

The phone field type (`type: "phone"`) comes with built-in country code selection and number formatting. It includes:

- Country code selection dropdown
- Automatic number formatting based on country
- International prefix handling
- Built-in validation

```tsx
import { Builder, PHONE_PREFIXES, FieldType } from "formly-reactjs";

// Access phone prefixes
console.log(PHONE_PREFIXES.USA); // "+1"
console.log(PHONE_PREFIXES.GBR); // "+44"

// Example field configuration
const phoneField = {
  name: "phoneNumber",
  type: "phone",
  label: "Phone Number",
  validators: [{ name: "required" }],
};

// The field value will be an object with the structure:
type PhoneValue = {
  countryCode: string; // e.g., "USA"
  prefix: string; // e.g., "+1"
  phoneNumber: string; // e.g., "2025550123"
};

// Custom phone field component
const CustomPhoneField = (props: FieldFormOverridesBase) => {
  const value = props.value as PhoneValue;
  return (
    <div className="custom-phone-field">
      <select
        value={value.countryCode}
        onChange={(e) => {
          const newCountryCode = e.target.value;
          props.onChange({
            countryCode: newCountryCode,
            prefix: PHONE_PREFIXES[newCountryCode],
            phoneNumber: value.phoneNumber,
          });
        }}
      >
        {Object.entries(PHONE_PREFIXES).map(([code, prefix]) => (
          <option key={code} value={code}>
            {code} ({prefix})
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={value.phoneNumber}
        onChange={(e) => {
          props.onChange({
            ...value,
            phoneNumber: e.target.value.replace(/\D/g, ""),
          });
        }}
      />
    </div>
  );
};

function App() {
  return (
    <Builder
      steps={[
        {
          fields: [phoneField],
        },
      ]}
      fieldOverwrites={{
        [FieldType.PHONE]: CustomPhoneField,
      }}
      onSubmit={handleSubmit}
    />
  );
}
```

## 🔒 Validation

Built-in validators:

- `required`: Field must have a value
- `email`: Must be a valid email address
- `minLength`: Minimum string length
- `maxLength`: Maximum string length
- `pattern`: Regular expression pattern with custom error message
- `custom`: Custom validation function that returns boolean

### Basic Validation Example

```tsx
const field = {
  name: "email",
  type: "text",
  validators: [
    {
      name: "required",
      errorMessage: "Email is required",
    },
    {
      name: "pattern",
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      errorMessage: "Invalid email format",
    },
  ],
};
```

### Pattern Validator

The pattern validator uses regular expressions to validate field values:

```tsx
const nameField = {
  name: "fullName",
  type: "text",
  label: "Full Name",
  validators: [
    {
      name: "required",
      errorMessage: "Name is required",
    },
    {
      name: "pattern",
      value: /^[a-zA-Z]+$/, // Only letters allowed
      errorMessage: "Name must contain only letters",
    },
  ],
};

const phoneField = {
  name: "phone",
  type: "text",
  label: "Phone Number",
  validators: [
    {
      name: "pattern",
      value: /^\d{10}$/, // Exactly 10 digits
      errorMessage: "Phone number must be 10 digits",
    },
  ],
};
```

### Custom Validator

Custom validators allow you to define complex validation logic using a function:

```tsx
const usernameField = {
  name: "username",
  type: "text",
  label: "Username",
  validators: [
    {
      name: "custom",
      value: (value: string) => value.length >= 3 && value.length <= 20,
      errorMessage: "Username must be between 3 and 20 characters",
    },
    {
      name: "custom",
      value: (value: string) => !value.includes(" "),
      errorMessage: "Username cannot contain spaces",
    },
  ],
};
```

### Block Field Validation

Block fields can have validators at both the block level and for individual fields within the block:

```tsx
const blockField = {
  name: "userDetails",
  type: "blocks",
  label: "User Details",
  description: "Add one or more user details",
  addLabel: "Add User",
  // Validates that at least one block exists
  validators: [
    {
      name: "required",
      errorMessage: "At least one user detail is required",
    },
  ],
  fields: [
    {
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      validators: [
        {
          name: "required",
          errorMessage: "Username is required",
        },
        {
          name: "custom",
          value: (value: string) => {
            // Complex validation example
            return value === "Jonny" || value === "Jane";
          },
          errorMessage: "Username must be either Jonny or Jane",
        },
      ],
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      validators: [
        {
          name: "custom",
          value: (value: number) => value >= 18,
          errorMessage: "User must be at least 18 years old",
        },
      ],
    },
  ],
};
```

## 🎨 Field Overwrites

Formly allows you to customize the rendering of any field type by providing custom components. This is useful when you want to maintain the form's logic but need a different UI representation.

### Overwrite Types

```tsx
type FieldFormOverridesBase = {
  onChange: (value: any) => void;
  value: any;
  errored?: FieldError;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultComponent?: React.ReactNode; // The original component
  stepIndex?: number;
  name?: string;
};

// Special props for block fields
type FieldFormOverridesBlock = FieldFormOverridesBase & {
  onAddBlock: () => void;
  onRemoveBlock: (index: number) => void;
  onValueChange: (blockIndex: number, name: string, value: any) => void;
  blocks: {
    fields: (Field & {
      value: any;
      defaultComponent: React.ReactNode;
    })[];
  }[];
};
```

### Usage Example

```tsx
import { Builder, FieldType } from "formly-reactjs";

// Custom text field component
const CustomTextField = (props: FieldFormOverridesBase) => {
  return (
    <div className="custom-input-wrapper">
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className={props.errored ? "error" : ""}
      />
      {props.errored && (
        <span className="error-message">{props.errored.message}</span>
      )}
    </div>
  );
};

// Custom blocks field component
const CustomBlocksField = (props: FieldFormOverridesBlock) => {
  return (
    <div className="custom-blocks-wrapper">
      {props.blocks.map((block, index) => (
        <div key={index} className="block">
          {block.fields.map((field) => (
            <div key={field.name}>
              {field.defaultComponent}
              <button onClick={() => props.onRemoveBlock(index)}>Remove</button>
            </div>
          ))}
        </div>
      ))}
      <button onClick={props.onAddBlock}>Add Block</button>
    </div>
  );
};

function App() {
  return (
    <Builder
      steps={steps}
      fieldOverwrites={{
        [FieldType.TEXT]: CustomTextField,
        [FieldType.BLOCKS]: CustomBlocksField,
      }}
      onSubmit={handleSubmit}
    />
  );
}
```

### Available Field Types for Overwrites

You can provide custom components for any of these field types:

- Text Fields: `text`, `text_area`, `number`, `email`, `secret`, `url`, `phone`, `otp`
- Date Fields: `date`, `date_range`
- Option Fields: `select`, `multi_select`, `option`, `multi_option`, `choice`, `multi_choice`
- Boolean Fields: `checkbox`
- Complex Fields: `blocks`
- File Fields: `files`

Each custom component receives the appropriate props type based on the field type, with block fields receiving additional props for managing block operations.

## 🎨 Styling

Formly uses Tailwind CSS for styling. You can customize the appearance through:

- Overriding the default components
- Tailwind configuration
- Theme customization (see docs)

### Color Customization

Formly uses CSS variables for theming. The default theme provides both light and dark mode variables that you can customize. You can override these variables in your CSS or modify them at runtime:

```css
:root {
  /* Base colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  /* Component colors */
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;

  /* UI element colors */
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  /* State colors */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  /* Border and input colors */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;

  /* Border radius */
  --radius: 0.5rem;
}

/* Dark mode overrides */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other dark mode variables ... */
}
```

To customize the theme, you can either:

1. Override the CSS variables in your stylesheet:

```css
:root {
  --primary: 240 100% 50%; /* Custom blue */
  --primary-foreground: 0 0% 100%;
}
```

2. Modify them at runtime using JavaScript:

```javascript
document.documentElement.style.setProperty("--primary", "240 100% 50%");
```

The variables use HSL color format (Hue Saturation Lightness) which makes it easy to create cohesive color schemes. Each color variable has a corresponding foreground variable that ensures proper contrast for text and icons.

## 🤝 Contributing

We welcome contributions!

<!-- Please see our [Contributing Guide](CONTRIBUTING.md) for details. -->

## 📄 License

MIT © Formly

<!-- ## 💬 Support

- [Documentation](https://formly-docs.com)
- [GitHub Issues](https://github.com/formly/formly-reactsdk/issues)
- [Discord Community](https://discord.gg/formly) -->
