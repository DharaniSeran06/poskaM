import { defineType, defineField } from "sanity";

export default defineType({
  name: "vacancy",
  title: "Vacancies / Careers",
  type: "document",
  description: "Job vacancies and career opportunities",

  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "object",
      initialValue: {},
      description: "Job title in multiple languages",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "de",
          title: "German (Deutsch)",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "jobDescription",
      title: "Job Description / Responsibilities",
      type: "object",
      initialValue: {},
      description: "Detailed job description and responsibilities",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "text",
          validation: (Rule) => Rule.required(),
          rows: 10,
        }),
        defineField({
          name: "de",
          title: "German (Deutsch)",
          type: "text",
          rows: 10,
        }),
      ],
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Job location (e.g., 'Zurich', 'Winterthur', 'Remote')",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "jobType",
      title: "Job Type",
      type: "string",
      description: "Employment type",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
          { title: "Temporary", value: "temporary" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "experienceLevel",
      title: "Experience Level",
      type: "string",
      description: "Required experience level (optional)",
      options: {
        list: [
          { title: "Entry Level", value: "entry" },
          { title: "Mid Level", value: "mid" },
          { title: "Senior Level", value: "senior" },
          { title: "Executive", value: "executive" },
        ],
      },
    }),

    defineField({
      name: "applyLink",
      title: "Apply Link or Email",
      type: "string",
      description: "Application URL or email address (e.g., 'mailto:careers@poskamanolito.ch' or 'https://...')",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
      description: "Date when the vacancy was published",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),

    defineField({
      name: "order",
      title: "Display Order / Priority",
      type: "number",
      description: "Order for sorting (lower numbers appear first)",
      initialValue: 0,
    }),

    defineField({
      name: "isActive",
      title: "Active Vacancy",
      type: "boolean",
      description: "Show this vacancy on the website",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "jobTitle.en",
      subtitle: "location",
      jobType: "jobType",
      publishedDate: "publishedDate",
    },
    prepare({ title, subtitle, jobType, publishedDate }) {
      return {
        title: title || "Untitled Vacancy",
        subtitle: `${subtitle || "No location"} • ${jobType || "No type"}${publishedDate ? ` • ${publishedDate}` : ""}`,
      };
    },
  },
});
