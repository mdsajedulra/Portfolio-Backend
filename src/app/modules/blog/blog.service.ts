/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

import jwt, { decode, JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";
import { IUser } from "../user/user.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: IUser) => {
  const result = await Blog.create(payload);
  return result;
};

// get all blogs

const getBlogs = async () => {
  const result = await Blog.find();
  return result;
};

// update own blog using object id

const updateBlog = async (payload: any) => {
  const { id, token, updateData } = payload;
  // console.log(id);

  const findBlog = await Blog.findById(id);

  if (findBlog) {
    // console.log(findBlog?.author);
    const findAuthor = await User.findById(findBlog?.author);
    // console.log(findAuthor);

    try {
      const decoded = jwt.verify(token, "secret") as JwtPayload;

      const { email, role } = decoded;

      if (email === findAuthor?.email && role === findAuthor?.role) {
        const result = await Blog.findByIdAndUpdate(id, updateData, {
          new: true,
        });

        return result;
      } else {
        throw new Error("Your are not allow to delete this blog");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // try {
  //   const decoded = jwt.verify(token, "secret"); // Replace "secret" with your actual secret key

  //   if (decoded?.email === "mdsajedulra@gmail.com") {
  //   }
  // } catch (error: unknown) {
  //   console.error("Token verification failed:", error.message);
  // }
  // const result = await Blog.findByIdAndUpdate();
};

const deleteBlog = async (payload: any) => {
  const { id, token } = payload;
  // console.log(id);

  const findBlog = await Blog.findById(id);
  if (!findBlog) {
    throw new Error("Blog not found");
  }
  if (findBlog) {
    // console.log(findBlog?.author);
    const findAuthor = await User.findById(findBlog?.author);
    // console.log(findAuthor);

    try {
      const decoded = jwt.verify(token, "secret") as JwtPayload;

      const { email, role } = decoded;

      if (email === findAuthor?.email && role === findAuthor?.role) {
        const result = await Blog.findByIdAndDelete(id);

        return result;
      } else if (role === "admin") {
        const result = await Blog.findByIdAndDelete(id);

        return result;
      } else {
        throw new Error("Your are not allow to delete this blog");
      }
    } catch (error: any) {
      throw new Error("Something went worng");
    }
  }
};

// delete own blog using blog id

// const deleteBlog = async (payload: any) => {
//   const { id, token } = payload;

//   try {
//     const findBlog = await Blog.findById(id);
//     if (!findBlog) {
//       throw new Error("Blog not found");
//     }

//     const findAuthor = await User.findById(findBlog.author);
//     if (!findAuthor) {
//       throw new Error("Author not found");
//     }

//     // Verify token
//     const decoded = jwt.verify(token, "secret") as JwtPayload;
//     const { email, role } = decoded;

//     // Check if user is authorized
//     if (email === findAuthor.email && role === findAuthor.role) {
//       const result = await Blog.findByIdAndDelete(id);
//       return { success: true, message: "Blog deleted successfully", result };
//     } else if (role === "admin") {
//       const result = await Blog.findByIdAndDelete(id);
//       return {
//         success: true,
//         message: "Blog deleted successfully by admin",
//         result,
//       };
//     } else {
//       throw new Error("Unauthorized to delete this blog");
//     }
//   } catch (error: any) {
//     console.error("Error:", error.message);
//     return { success: false, message: error.message };
//   }
// };

export const blogServices = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
