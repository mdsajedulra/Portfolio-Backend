import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectService } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await projectService.createProject(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const projectDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await projectService.deleteProject(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await projectService.updateProject(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

// get project

const getProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getProjects();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: projects,
  });
});

// get single project
const getProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProject(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project retrieved successfully",
    data: project,
  });
});

export const projectController = {
  createProject,
  projectDelete,
  updateProject,
  getProject,
  getProjects,
};
