import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchName: { type: String, required: true, unique: true },
    assignments: [
        {
            teacherName: String,
            assignment: String,
            date_time: {
                date: String,
                time: String
            },
            studentList: [
                {
                    studentName: String,
                    studentId: String,
                    message: String,
                    pdf: String,
                    date_time: {
                        date: String,
                        time: String
                    }
                }
            ]
        }
    ],
    messages: [
        {
            teacherName: String,
            message: String,
            date_time: {
                date: String,
                time: String
            },
        }
    ]
}, { timestamps: true })


const branchCol = new mongoose.model("branchCollection", branchSchema)

export default branchCol;