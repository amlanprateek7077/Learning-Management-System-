import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    teacherId: { type: String, required: true, unique: true },
    teacherName: String,
    teacherPassword: String,
    branch: String
})

const teacherCol = new mongoose.model("teacherCollection", teacherSchema)
export default teacherCol;