import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobApplication",
  title: "Job Application",
  type: "document",
  description: "Job applications submitted through the careers form",

  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => 
        Rule.required()
          .email()
          .error("Please enter a valid email address"),
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Optional phone number",
    }),

    defineField({
      name: "position",
      title: "Position Applied For",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "message",
      title: "Message / Cover Note",
      type: "text",
      description: "Optional cover letter or message",
      rows: 5,
    }),

    defineField({
      name: "resume",
      title: "Resume / CV",
      type: "file",
      description: "Uploaded resume file (PDF or DOCX)",
      validation: (Rule) => Rule.required(),
      options: {
        accept: ".pdf,.doc,.docx",
      },
    }),

    defineField({
      name: "language",
      title: "Language",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "German (Deutsch)", value: "de" },
        ],
        layout: "radio",
      },
      initialValue: "en",
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      name: "fullName",
      position: "position",
      email: "email",
      language: "language",
      submittedAt: "submittedAt",
    },
    prepare({ name, position, email, language, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : "No date";
      const positionLabel = position || "No position";
      const langLabel = language === "de" ? "DE" : "EN";
      
      return {
        title: `${name || "Anonymous"}`,
        subtitle: `${positionLabel} • ${email || "No email"} • ${langLabel} • ${date}`,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Oldest First",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
  ],
});
