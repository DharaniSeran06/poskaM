import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",

  fields: [
    defineField({
      name: "propertyId",
      title: "Property ID",
      type: "string",
      description: "Example: PRO-001",
    }),

    defineField({
      name: "property_title",
      title: "Object / Project Title",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "property_title.en",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "string",
        },
      ],
      description: "Residential / Commercial / Renovation",
    }),

    defineField({
      name: "works",
      title: "Works",
      type: "object",
      initialValue: {},
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "de",
          title: "Deutsch (German)",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      description: "Bullet points shown in card",
    }),

    defineField({
      name: "architecturePlanning",
      title: "Architecture & Planning",
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
              name: "title",
              title: "Title / Label",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule: any) => 
                Rule.required()
                  .uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                  })
                  .error('Please enter a valid URL (http:// or https://)'),
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
              name: "title",
              title: "Title / Label",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule: any) => 
                Rule.uri({
                  scheme: ['http', 'https'],
                  allowRelative: false,
                })
                .error('Please enter a valid URL (http:// or https://)'),
            },
          ],
        },
      ],
      description: "Architecture & Planning information with clickable link",
    }),

    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Optional filter tag (language-independent)",
    }),

    defineField({
      name: "description",
      title: "Description",
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
      description: "Detailed project description for detail page",
    }),

    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Gallery Image",
          initialValue: {},
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Alternative text for accessibility (optional)",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Image caption (optional)",
            },
          ],
          preview: {
            select: {
              title: "caption",
              media: "image",
              alt: "alt",
            },
            prepare({ title, media, alt }) {
              return {
                title: title || alt || "Gallery Image",
                media,
              };
            },
          },
        },
      ],
      description: "Multiple images for project gallery section (optional)",
    }),
  ],
});
