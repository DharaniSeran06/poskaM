import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Services",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Service Title",
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
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
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
      name: "shortDescription",
      title: "Short Description",
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
      description: "Brief description for cards/listing pages",
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Large image for service detail page hero section",
    }),

    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Multiple images for gallery section",
    }),

    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for before/after slider",
    }),

    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for before/after slider",
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
      description: "Service category (e.g., Construction, Renovation, Maintenance)",
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
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
      description: "SEO meta description",
    }),

    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      description: "Show this service on homepage",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order for sorting (lower numbers appear first)",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "title.en",
      media: "thumbnail",
    },
  },
});
