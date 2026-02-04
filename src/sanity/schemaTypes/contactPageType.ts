import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "string",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Short Description / Intro Text",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "text",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "text",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: "officeAddress",
      title: "Office Address",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "text",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "text",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      initialValue: "",
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "string",
      initialValue: "",
      validation: (Rule: any) => 
        Rule.required()
          .email("Please enter a valid email address"),
    }),

    defineField({
      name: "googleMapsEmbed",
      title: "Google Maps Embed URL",
      type: "url",
      initialValue: "",
      description: "Paste the Google Maps embed URL or iframe src",
    }),

    defineField({
      name: "googleMapsCoordinates",
      title: "Google Maps Coordinates (Alternative)",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "latitude",
          title: "Latitude",
          type: "number",
        },
        {
          name: "longitude",
          title: "Longitude",
          type: "number",
        },
      ],
      description: "Alternative to embed URL - provide coordinates for custom map",
    }),

    defineField({
      name: "businessHours",
      title: "Business Working Hours",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "object",
          initialValue: {},
          fields: [
            {
              name: "mondayFriday",
              title: "Monday - Friday",
              type: "string",
              initialValue: "",
            },
            {
              name: "saturday",
              title: "Saturday",
              type: "string",
              initialValue: "",
            },
            {
              name: "sunday",
              title: "Sunday",
              type: "string",
              initialValue: "",
            },
          ],
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "object",
          initialValue: {},
          fields: [
            {
              name: "mondayFriday",
              title: "Montag - Freitag",
              type: "string",
              initialValue: "",
            },
            {
              name: "saturday",
              title: "Samstag",
              type: "string",
              initialValue: "",
            },
            {
              name: "sunday",
              title: "Sonntag",
              type: "string",
              initialValue: "",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "formSuccessMessage",
      title: "Contact Form Success Message",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "string",
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "text",
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "text",
        },
      ],
      description: "SEO meta description for search engines",
    }),
  ],

  preview: {
    select: {
      title: "title.en",
    },
  },
});
