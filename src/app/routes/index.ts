import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authrouter from "../modules/auth/auth.route";
import projectRoute from "../modules/projects/project.route";
import blogRoutes from "../modules/blog/blog.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authrouter,
  },
  {
    path: "/projects",
    route: projectRoute,
  },
  {
    path: "/blog",
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
