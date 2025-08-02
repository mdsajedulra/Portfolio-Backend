export interface IProject {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  category: "Frontend" | "mobile" | "design" | "other" | "Backend";
}