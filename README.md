# Formly React SDK

A modern, type-safe form builder SDK for React applications that makes creating complex forms a breeze. Build beautiful multi-step forms with built-in validation, customizable components, and a delightful developer experience.

![npm version](https://badge.fury.io/js/formly-reactjs.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

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
- `pattern`: Regular expression pattern
- `custom`: Custom validation function

Example:

```tsx
const field = {
  name: "email",
  type: "text",
  validators: [
    {
      name: "required",
      message: "Email is required",
    },
    {
      name: "pattern",
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email format",
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

- Custom CSS classes via the `className` prop
- Tailwind configuration
- Theme customization (see docs)

### Color Customization

You can customize the colors of your form components by passing a `colors` prop to the `Builder` component:

```tsx
import { Builder } from "formly-reactjs";
import { TW_COLORS } from "formly-reactjs/constants/colors";

function App() {
  return (
    <Builder
      steps={steps}
      colors={{
        background: "blue", // Primary background color
        backgroundSecondary: "indigo", // Secondary background color
        text: "gray", // Primary text color
        textSecondary: "slate", // Secondary text color
        error: "red", // Error state color
        buttons: {
          primary: "blue", // Primary button color
          secondary: "gray", // Secondary button color
        },
        ring: "blue", // Focus ring color
      }}
      onSubmit={handleSubmit}
    />
  );
}
```

Available color options (TW_COLORS):

- Basic: `gray`, `zinc`, `neutral`, `stone`
- Warm: `red`, `orange`, `amber`, `yellow`
- Nature: `lime`, `green`, `emerald`, `teal`
- Cool: `cyan`, `sky`, `blue`, `indigo`
- Vibrant: `violet`, `purple`, `fuchsia`, `pink`, `rose`

Each color follows Tailwind CSS's color palette system and will automatically handle different shades for various states (hover, focus, etc.).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © Formly

## 💬 Support

- [Documentation](https://formly-docs.com)
- [GitHub Issues](https://github.com/formly/formly-reactsdk/issues)
- [Discord Community](https://discord.gg/formly)
