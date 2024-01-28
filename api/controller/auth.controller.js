import User from "../modals/user.modal.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password || username === "" || email === "" || password === "") {
            next(errorHandler(400, "All fields are required"))
        }

        const hashPassword = await bcryptjs.hash(password, 10); 
        const newUser = new User({
            username,
            email,
            hashPassword
        })

        await newUser.save()
        res.json("Signup successful")
    } catch (err) {
        next(err)
    }
}

export { signup }
