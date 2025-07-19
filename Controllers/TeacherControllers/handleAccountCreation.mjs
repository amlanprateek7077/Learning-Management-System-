import teacherCol from "../../Models/teacherModel.mjs";
import { v4 as uuidv4 } from "uuid";
import { generateEncryptedPassword } from "../../utils/generateEncryptedPassword.mjs";
import bcryptjs from "bcryptjs"

export const signin = async (req, res) => {
    try {
        const { name, pass, branch } = req.body;

        if (!name || !pass || !branch)
            return res.status(200).json({ status: false, message: "All Fields must be filled!!!" })

        if (!new RegExp("^[a-zA-Z][a-zA-Z.\\s]+[a-zA-Z]+$").test(name.trim()))
            return res.status(200).json({ status: false, message: "Invalid Name" })

        else {
            const data = new teacherCol({
                teacherId: `teacher${Date.now().toString().substring(8, 13)}`,
                teacherName: name,
                teacherPassword: await generateEncryptedPassword(pass),
                branch: branch
            })

            const response = await data.save()
            return res.status(200).json({
                status: response !== undefined && response !== null,
                message: response
            })
        }


    } catch (error) {
        console.error(`Signin error : ${error}`)
    }
}

export const login = async (req, res) => {
    try {
        const { id, pass } = req.body;
        const data = await teacherCol.findOne({ teacherId: id });

        if (data) {
            const isPasswordCorrect = bcryptjs.compareSync(pass, data.teacherPassword)

            isPasswordCorrect
                ? res.status(200).json({ status: true, message: data })
                : res.status(200).json({ status: false, message: "Wrong Credential" })
        } else {
            res.status(200).json({ status: false, message: "Not Found. Try to Signin" })
        }
    } catch (error) {
        console.log(`Login error : ${error}`)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("classroom");
        res.status(200).send(true)
    } catch (error) {
        console.error(`Logout error : ${error}`)
    }
}