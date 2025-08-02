import { Router } from "express";
import { projectController } from "./project.controller";

const projectRoute = Router();

projectRoute.get("/", projectController.getProjects);
projectRoute.get("/:id", projectController.getProject);
projectRoute.post("/", projectController.createProject);
projectRoute.delete("/:id", projectController.projectDelete);
projectRoute.patch("/:id", projectController.updateProject);

export default projectRoute;
