import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors"
import { router as teacherRouter } from "./Routes/teacherRoute.mjs"
import { router as studentRouter } from "./Routes/studentRoute.mjs"
import { router as otherRotuer } from "./Routes/otherRoutes.mjs";
import multer from "multer";
import { uploadPdf } from "./utils/uploadPdf.mjs";

dotenv.config()

const web = express()

web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(cors())

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Database connection successful"))
    .catch(err => console.error(`Database connection error : ${err}`))


web.use("/pdf", express.static("./PDFs"))

web.post("/api/uploadPdf",uploadPdf.single("pdf"), async(req, res)=>{
    res.status(200).send(req.file.filename)
})

web.use("/api", otherRotuer)
web.use("/api/teacher", teacherRouter)
web.use("/api/student", studentRouter)

web.listen(PORT, () => console.log(`Server listening at port number : ${PORT}`))