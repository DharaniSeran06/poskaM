import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeStats",
  title: "Home Stats",
  type: "document",
  description: "Statistics section for the homepage",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Optional title for the stats section (e.g., 'Our Achievements')",
    }),

    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      initialValue: [],
      description: "Array of statistics to display",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Text displayed below the number (e.g., 'Projects Completed', 'Years Experience', 'Client Satisfaction')",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "number",
              description: "Final number to count up to (e.g., 500, 15, 98)",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "Symbol displayed after the number (e.g., '+', '%')",
              validation: (Rule) => Rule.max(5).error('Suffix should be short (max 5 characters)'),
            }),
            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              description: "Order in which this stat appears (lower numbers appear first)",
              validation: (Rule) => Rule.integer().min(0),
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
              suffix: "suffix",
            },
            prepare({ title, subtitle, suffix }) {
              return {
                title: title || "Untitled Stat",
                subtitle: `${subtitle || 0}${suffix || ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one statistic is required'),
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Enable / disable this section on homepage",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
    },
    prepare({ title, isActive }) {
      return {
        title: title || "Home Stats",
        subtitle: isActive ? "Active" : "Inactive",
      };
    },
  },
});
