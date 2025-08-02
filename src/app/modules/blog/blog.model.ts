import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    readingTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
