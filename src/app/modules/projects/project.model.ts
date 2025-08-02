import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  github: { type: String, required: true },
  demo: { type: String, required: true },
  featured: { type: Boolean, required: true },
  category: {
    type: String,
    enum: ["Frontend", "mobile", "design", "other", "Backend"],
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
