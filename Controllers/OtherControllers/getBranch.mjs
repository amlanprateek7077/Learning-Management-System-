import branchCol from "../../Models/branchModel.mjs"

export default async (req, res) => {
    try {
        const data = await branchCol.find()
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
    }
}