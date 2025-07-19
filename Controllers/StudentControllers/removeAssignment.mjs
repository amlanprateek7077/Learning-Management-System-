import branchCol from "../../Models/branchModel.mjs";

export default async (req, res) => {
    try {
        const { stdId, branch, assignment } = req.query;
        const data = await branchCol.updateOne({ branchName: branch, "assignments.assignment": assignment }, {
            $pull: {
                "assignments.$.studentList": { studentId: stdId }
            }
        }, { new: true })
        if (data.modifiedCount > 0) {
            res.status(200).json({ message: "Remove Successfully" })
        } else {
            res.status(200).json({ message: "Something went wrong!!!" })
        }
    } catch (error) {
        console.error(`Removing Assignment : ${error}`)
    }
}