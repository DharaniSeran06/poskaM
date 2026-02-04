import { type SchemaTypeDefinition } from "sanity"

import project from "./projectType";
import service from "./serviceType";
import testimonial from "./testimonialType";
import vacancy from "./vacancyType";
import contactPage from "./contactPageType";
import footer from "./footerType";
import homeStats from "./homeStatsType";
import quoteRequest from "./quoteRequest";

const schemaConfig: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    service,
    testimonial,
    vacancy,
    contactPage,
    footer,
    homeStats,
    quoteRequest,
  ],
};

export { schemaConfig as schema };
