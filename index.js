import React from "react";
import { createRoot } from "react-dom/client";
import Builder from "./components/Builder";

import "./globals.css";

const STEPS = [
  {
    title: "Contact Information",
    fields: [
      {
        name: "website",
        type: "url",
        placeholder: "https://example.com",
        validators: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "phone",
        type: "phone",
        validators: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "email",
        type: "email",
        placeholder: "example@example.com",
        validators: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "password",
        type: "secret",
      },
    ],
  },
  {
    fields: [
      {
        name: "age",
        type: "number",
        label: "Age",
        validators: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "year_of_birth",
        type: "date",
        label: "Year of Birth",
        validators: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "teens",
        type: "date_range",
      },
    ],
  },
  {
    title: "Personal Information",
    subtitle: "Please fill in your personal information",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Mike",
        description: "Please enter your name",
        validators: [
          {
            name: "required",
            errorMessage: "Name is required",
          },
        ],
      },
      {
        name: "surname",
        type: "text",
        description: "Please enter your surname",
        placeholder: "Ukas",
        validators: [
          {
            name: "minLength",
            value: 2,
            errorMessage: "Surname must be at least 2 characters long",
          },
          {
            name: "maxLength",
            value: 10,
            errorMessage: "Surname must be at most 10 characters long",
          },
        ],
      },
    ],
  },
  {
    fields: [
      {
        name: "hobbies",
        type: "select",
        options: [
          {
            label: "Reading",
            value: "reading",
          },
          {
            label: "Writing",
            value: "writing",
          },
          {
            label: "Coding",
            value: "coding",
          },
        ],
        validators: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "description_hobbies",
        type: "text_area",
        description: "Optional",
        placeholder: "I love reading and writing...",
        validators: [
          {
            name: "minLength",
            value: 10,
            errorMessage: "Description must be at least 10 characters long",
          },
        ],
      },
    ],
  },
];

const root = createRoot(document.getElementById("root"));
root.render(
  <div
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Builder
      className="w-[400px]"
      steps={STEPS}
      title="Form Builder"
      description="Build your form"
      onSubmit={(data) => {
        console.log("FINISHED!", data);
      }}
    />
  </div>
);
