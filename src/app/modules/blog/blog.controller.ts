import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";

const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  const authorization = req.headers;

  const [, token] = authorization.authorization?.split(" ") as string[];

  const decoded = jwt.verify(token, "secret") as JwtPayload;

  const { email, role } = decoded;
  // console.log(email, role);

  const user = await User.findOne({ email }); // find user by jwt decoded user email
  // console.log(user?._id);

  payload.author = user?._id;

  // console.log(Bearer, token);

  const result = await blogServices.createBlog(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog Created Successfully",
    data: result,
  });
});

// get all blogs

const getBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getBlogs();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});

// update blog

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const [Bearer, token] = req.headers.authorization?.split(" ") as string[]; // token and bearer extract from headers

  const updateData = req.body;
  const payload = { id, token, updateData };

  const result = await blogServices.updateBlog(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

// delete blog

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;

  const [Bearer, token] = req.headers.authorization?.split(" ") as string[];

  const payload = { id, token };

  const result = await blogServices.deleteBlog(payload);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Blog deleted successfully",
    });
  }
});

export const blogController = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
