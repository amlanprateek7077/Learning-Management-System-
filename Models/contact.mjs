import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    contactNo:String
})

const contactCol = new mongoose.model("ContactCollection",contactSchema)
export default contactCol;