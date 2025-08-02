import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";

import validateRequest from "../../middlewares/validateRequest";
import { blogPostSchema } from "./blog.validation";

const blogRoutes = Router();

blogRoutes.post(
  "/",
  validateRequest(blogPostSchema),
  auth("admin"),
  blogController.createBlog
);

blogRoutes.get("/", blogController.getBlogs);

blogRoutes.patch("/:id", auth("admin"), blogController.updateBlog);

blogRoutes.delete("/:id", auth("user", "admin"), blogController.deleteBlog);

export default blogRoutes;
