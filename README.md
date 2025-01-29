# Formly React SDK

A modern, type-safe form builder SDK for React applications that makes creating complex forms a breeze. Build beautiful multi-step forms with built-in validation, customizable components, and a delightful developer experience.

![npm version](https://badge.fury.io/js/formly-reactjs.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

[GitHub Repository](https://github.com/ChrisCoder9000/formly-reactjs)

## ✨ Features

- 🎯 **Type-Safe**: Built with TypeScript for robust type checking and better IDE support
- 🚀 **Multi-Step Forms**: Create wizard-like experiences with ease
- 📝 **Smart Validation**: Built-in validators with custom validation support
- 🎨 **Customizable UI**: Pre-built components with Tailwind CSS styling
- 🔄 **State Management**: Efficient form state handling out of the box
- 📱 **Responsive**: Mobile-first design approach
- 🎈 **Zero Config**: Start building forms instantly with included styles

## 📦 Installation

```bash
npm install formly-reactjs

# or with yarn
yarn add formly-reactjs

# or with pnpm
pnpm add formly-reactjs
```

## 🎨 Tailwind CSS Setup (Required)

Formly requires Tailwind CSS for styling. Follow these steps to set it up:

1. Install Tailwind CSS and its peer dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
# or
yarn add -D tailwindcss postcss autoprefixer
# or
pnpm add -D tailwindcss postcss autoprefixer
```

2. Create a `postcss.config.js` file:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

3. Create a `tailwind.config.js` file:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/formly-reactjs/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border|ring)-(gray|zinc|red|blue|green|yellow|purple|pink|indigo|orange)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ["hover", "focus", "focus-visible"],
    },
    {
      pattern:
        /(bg|text|border|ring)-(gray|zinc|red|blue|green|yellow|purple|pink|indigo|orange)-(50\/10|100\/10|200\/10|300\/10|400\/10|500\/10|600\/10|700\/10|800\/10|900\/10)/,
      variants: ["hover", "focus", "focus-visible"],
    },
    {
      pattern: /ring-(0|1|2|4|8)/,
      variants: ["focus", "focus-visible"],
    },
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
};
```

> **Important**: This configuration is required for proper styling of form components. Make sure to include all the theme extensions and safelist patterns as they are used for dynamic color applications and animations.

4. Add Tailwind's directives to your CSS:

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
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
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
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
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

> **Important**: These CSS variables are required for proper styling of form components. They provide the base colors and theme values used throughout the library. You can customize these values to match your application's theme.

### Alternative: Using Pre-built CSS

If you prefer not to install Tailwind CSS, you can manually add our pre-built CSS file from:
https://github.com/ChrisCoder9000/formly-reactjs-styles

Download the `output.css` file and include it in your project.

## 🚀 Quick Start

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
  className?: string; // Custom CSS class
  onSubmit: (data: any) => void; // Submit callback
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
