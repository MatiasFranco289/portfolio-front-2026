import { TechnologyType } from "./app/interfaces";

export const GITHUB_URL = "https://github.com/MatiasFranco289";
export const LINKEDIN_URL = "https://www.linkedin.com/in/matiasfranco289";
export const EMAIL = "matias.franco289@gmail.com";

export const RESUME_EN = "/resume_en.pdf";
export const RESUME_ES = "/resume_es.pdf";

export const API_KEY = "API_KEY";
export const ES = "ES";
export const US = "US";

export const LOGIN_URL = "/auth/login";
export const PROJECTS_FROM_USER_URL = "/users/1/projects";
export const USER_DETAILS_URL = "/users/1";
export const PROJECTS_URL = "/projects";
export const BLOGS_URL = "/blogs";

export const TECHNOLOGY_BY_LANGUAGES: Record<
  TechnologyType,
  { es: string; en: string }
> = {
  LANGUAGES: { en: "Languages", es: "Lenguajes" },
  FRONTEND: { en: "Frontend", es: "Frontend" },
  BACKEND: { en: "Backend", es: "Backend" },
  MOBILE: { en: "Mobile", es: "Mobile" },
  DB: { en: "Databases", es: "Bases de datos" },
  "GAME DEVELOPMENT": {
    en: "Game Development",
    es: "Desarrollo de videojuegos",
  },
  INFRA: { en: "Infrastructure", es: "Infraestructura" },
  TESTING: { en: "Testing", es: "Testing" },
  "VERSION CONTROL": { en: "Version Control", es: "Control de versiones" },
  METHODOLOGIES: { en: "Methodologies", es: "Metodologías" },
  TOOLS: { en: "Tools", es: "Herramientas" },
  OTHERS: { en: "Others", es: "Otros" },
};
