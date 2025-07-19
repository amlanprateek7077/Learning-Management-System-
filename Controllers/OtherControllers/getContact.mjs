import contactCol from "../../Models/contact.mjs"

export default async (req, res) => {
    try {
        const data = new contactCol({
            contactNo: req.body.contact
        })
        await data.save()
    } catch (error) {
        console.error(error)
    }
}