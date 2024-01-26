import User from "../modals/user.modal.js"
import bcryptjs from "bcryptjs"

const signup = async(req, res) => {
    try{
        const { username, email, password } = req.body

        if(!username || !email || !password || username === "" || email === "" || password === ""){
            return res.status(400).json({message:"All feilds are required"})
        }

        const hashPassword = bcryptjs.hash(password, 10)
        const newUser = new User({
            username,
            email,
            hashPassword
        })

        await newUser.save()
        res.json("Signup successfull")
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

export { signup }