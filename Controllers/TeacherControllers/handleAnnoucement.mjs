import announcementCol from "../../Models/annoucementModel.mjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { generateTime } from "../../utils/generateTime.mjs";

export default async (req, res) => {
    try {
        const { teacherName, message } = req.body;
        const data = new announcementCol({
            teacherName,
            message,
            date_time: {
                date: generateDate(),
                time: generateTime()
            }
        })

        const response = await data.save()
        res.status(200).json({
            status: response !== null && response !== undefined,
            message: response
        })
    } catch (error) {
        console.error(`Handling Announcment Error --> ${error}`)
    }
}