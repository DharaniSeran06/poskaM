import { defineType, defineField } from "sanity";

export default defineType({
  name: "quoteRequest",
  title: "Quote Request",
  type: "document",
  description: "Quote requests submitted through the contact form",

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
      name: "service",
      title: "Service",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Plaster Casts", value: "plaster-casts" },
          { title: "Drywall", value: "drywall" },
          { title: "Painting", value: "painting" },
          { title: "Facades and Insulation", value: "facades-and-insulation" },
          { title: "Customer Masons", value: "customer-masons" },
          { title: "Architecture", value: "architecture" },
          { title: "Planning", value: "planning" },
          { title: "Interior", value: "interior" },
          { title: "Renovation", value: "renovation" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
    }),

    defineField({
      name: "projectDetails",
      title: "Project Details",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(2000),
      rows: 5,
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
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      name: "fullName",
      service: "service",
      email: "email",
      language: "language",
      createdAt: "createdAt",
    },
    prepare({ name, service, email, language, createdAt }) {
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : "No date";
      const serviceLabel = service || "No service";
      const langLabel = language === "de" ? "DE" : "EN";
      
      return {
        title: `${name || "Anonymous"}`,
        subtitle: `${serviceLabel} • ${email || "No email"} • ${langLabel} • ${date}`,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Oldest First",
      name: "createdAtAsc",
      by: [{ field: "createdAt", direction: "asc" }],
    },
  ],
});
