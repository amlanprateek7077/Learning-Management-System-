import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    teacherName: String,
    message: String,
    date_time: {
        date: String,
        time: String
    }
})

const announcementCol = new mongoose.model("announcementCollection", announcementSchema)
export default announcementCol;