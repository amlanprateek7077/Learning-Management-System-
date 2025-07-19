import branchCol from "../../Models/branchModel.mjs";

export default async (req, res) => {
    try {
        const { branch, stdId, assignment } = req.query;
        const data = await branchCol.findOne({ branchName: branch, "assignments.assignment": assignment })
        
        if (data) {
            const assignmentData = data.assignments.find(assign => assign.assignment === assignment)
            const studentData = assignmentData.studentList.find(std => std.studentId === stdId)

            res.status(200).json({
                status: true,
                
                message: studentData
            })
        } else {
            res.status(200).json({
                status: false,
                message: null
            })
        }
    } catch (error) {
        console.error(`Couldn't retrieve student assignment : ${error}`)
    }
}