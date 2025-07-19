import announcementCol from "../../Models/annoucementModel.mjs"

export default async (req, res) => {
    try {
        const data = await announcementCol.find()
 
        res.status(200).json({
            status: data !== null,
            message: data
        })
    } catch (error) {
        console.error(`Retrieving Announcements : ${error}`)
    }
}