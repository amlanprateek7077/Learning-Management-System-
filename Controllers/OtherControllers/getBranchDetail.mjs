import branchCol from "../../Models/branchModel.mjs";

export default async (req, res) => {
    try {
        const branch = req.query.branch;
        const data = await branchCol.findOne({ branchName: branch })
        res.status(200).json({
            status: data !== null && data !== undefined,
            message: data
        })
    } catch (error) {
        console.error(`Retrieving Branch Details : ${error}`)
    }
}