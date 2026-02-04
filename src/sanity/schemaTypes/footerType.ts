import { defineType, defineField } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  description: "Website footer content with multilingual support",

  fields: [
    // Footer Description (Multilingual)
    defineField({
      name: "description",
      title: "Footer Description",
      type: "object",
      initialValue: {},
      description: "Short description/company bio shown in footer",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "de",
          title: "German (Deutsch)",
          type: "text",
          rows: 3,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Navigation Links (Multilingual)
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      initialValue: [],
      description: "Quick navigation links (Home, About, etc.)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "object",
              initialValue: {},
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Internal route (e.g., /about) or external URL",
              validation: (Rule) => 
                Rule.required()
                  .custom((url: string | undefined) => {
                    if (!url) return true;
                    // Allow relative paths or valid URLs
                    if (url.startsWith('/')) return true;
                    if (url.startsWith('http://') || url.startsWith('https://')) return true;
                    return 'URL must start with /, http://, or https://';
                  }),
            }),
          ],
          preview: {
            select: {
              title: "label.en",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // Services Links (Multilingual)
    defineField({
      name: "servicesLinks",
      title: "Services Links",
      type: "array",
      initialValue: [],
      description: "Links to service pages",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "object",
              initialValue: {},
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Service page route (e.g., /services/plaster-casts)",
              validation: (Rule) => 
                Rule.required()
                  .custom((url: string | undefined) => {
                    if (!url) return true;
                    if (url.startsWith('/')) return true;
                    if (url.startsWith('http://') || url.startsWith('https://')) return true;
                    return 'URL must start with /, http://, or https://';
                  }),
            }),
          ],
          preview: {
            select: {
              title: "label.en",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // Legal Links (Multilingual)
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      type: "object",
      initialValue: {},
      description: "Privacy Policy and Terms & Conditions links",
      fields: [
        defineField({
          name: "privacyPolicy",
          title: "Privacy Policy",
          type: "object",
          initialValue: {},
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "object",
              initialValue: {},
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Privacy policy page route (e.g., /privacy)",
              validation: (Rule) => 
                Rule.required()
                  .custom((url: string | undefined) => {
                    if (!url) return true;
                    if (url.startsWith('/')) return true;
                    if (url.startsWith('http://') || url.startsWith('https://')) return true;
                    return 'URL must start with /, http://, or https://';
                  }),
            }),
          ],
        }),
        defineField({
          name: "termsAndConditions",
          title: "Terms & Conditions",
          type: "object",
          initialValue: {},
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "object",
              initialValue: {},
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Terms & Conditions page route (e.g., /terms)",
              validation: (Rule) => 
                Rule.required()
                  .custom((url: string | undefined) => {
                    if (!url) return true;
                    if (url.startsWith('/')) return true;
                    if (url.startsWith('http://') || url.startsWith('https://')) return true;
                    return 'URL must start with /, http://, or https://';
                  }),
            }),
          ],
        }),
      ],
    }),

    // Company Logo (Global)
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      description: "Company logo displayed in footer",
      validation: (Rule) => Rule.required(),
    }),

    // Social Media Links (Global)
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "array",
      initialValue: [],
      description: "Social media platform links",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform Name",
              type: "string",
              description: "e.g., Facebook, LinkedIn, Instagram, WhatsApp",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Full URL to social media profile",
              validation: (Rule) => 
                Rule.required()
                  .uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                  })
                  .error('Please enter a valid URL (http:// or https://)'),
            }),
            defineField({
              name: "icon",
              title: "Icon Reference",
              type: "string",
              description: "Optional: Icon identifier (e.g., 'facebook', 'linkedin')",
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // Copyright Text (Multilingual)
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "object",
      initialValue: {},
      description: "Copyright text (year will be added automatically)",
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
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "description.en",
    },
    prepare({ title }) {
      return {
        title: title || "Footer",
        subtitle: "Website Footer",
      };
    },
  },
});
