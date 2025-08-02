import { IProject } from "./project.interface";
import Project from "./project.model";

const createProject = async (payload: IProject) => {
  const result = await Project.create(payload);
  return result;
};
const deleteProject = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};
const updateProject = async (id: string, payload: Partial<IProject>) => {
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
// get project

const getProjects = async () => {
  const projects = await Project.find({});
  return projects;
};

// get single project

const getProject = async (id: string) => {
  const project = await Project.findById(id);
  return project;
};

export const projectService = {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  getProjects,
};
