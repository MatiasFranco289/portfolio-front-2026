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

export const TECHNOLOGY_TYPE_COLORS: Record<TechnologyType, string> = {
  LANGUAGES: "#3178C6", // Azul TypeScript / Azul fuerte
  FRONTEND: "#00E5FF", // Cyan neón / Turquesa brillante
  BACKEND: "#10B981", // Verde esmeralda
  MOBILE: "#84CC16", // Verde lima
  DB: "#F59E0B", // Ámbar / Dorado
  "GAME DEVELOPMENT": "#EC4899", // Rosa neón / Magenta
  INFRA: "#FF6B00", // Naranja intenso
  TESTING: "#EF4444", // Rojo carmesí
  "VERSION CONTROL": "#8B5CF6", // Violeta / Púrpura
  METHODOLOGIES: "#06B6D4", // Azul océano
  TOOLS: "#64748B", // Gris pizarra metálico
  OTHERS: "#A1A1AA", // Gris claro neutro
};
