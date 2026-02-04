import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  description: "Client testimonials for the 'What Our Clients Say' section",

  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Full name of the client",
    }),

    defineField({
      name: "clientRole",
      title: "Client Role / Company",
      type: "string",
      description: "Job title, role, or company name (e.g., 'Property Owner', 'Building Manager')",
    }),

    defineField({
      name: "content",
      title: "Testimonial Content",
      type: "object",
      initialValue: {},
      description: "The testimonial text in multiple languages",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "text",
          validation: (Rule) => Rule.required(),
          description: "Testimonial content in English",
        }),
        defineField({
          name: "de",
          title: "German (Deutsch)",
          type: "text",
          description: "Testimonial content in German (optional, falls back to English if missing)",
        }),
      ],
    }),

    defineField({
      name: "clientImage",
      title: "Client Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional photo of the client",
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Client rating (1-5 stars)",
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
    }),

    defineField({
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      description: "Show this testimonial prominently on the homepage",
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
      title: "clientName",
      subtitle: "clientRole",
      media: "clientImage",
      rating: "rating",
    },
    prepare({ title, subtitle, media, rating }) {
      return {
        title: title || "Untitled Testimonial",
        subtitle: `${subtitle || "No role"}${rating ? ` • ${rating}⭐` : ""}`,
        media,
      };
    },
  },
});
