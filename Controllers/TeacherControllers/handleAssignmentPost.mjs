import branchCol from "../../Models/branchModel.mjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { generateTime } from "../../utils/generateTime.mjs";

export default async (req, res) => {
    try {
        const branchName = req.params.branch;
        const { teacherName, assignment } = req.body;

        const response = await branchCol.findOneAndUpdate({ branchName: branchName }, {
            $push: {
                assignments: {
                    teacherName: teacherName,
                    assignment: assignment,
                    date_time:{
                        date:generateDate(),
                        time:generateTime()
                    }
                }
            }
        }, { new: true })
        res.status(200).json({ status: response !== null && response !== undefined, message: response })
    } catch (error) {
        console.error(`Posting Assignment Error : ${error}`)
    }
}