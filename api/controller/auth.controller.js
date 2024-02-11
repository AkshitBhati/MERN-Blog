import User from "../modals/user.modal.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

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

const signin = async(req, res, next) => {
    const { email, password } = req.body
    if(!email || !password || email === "" || password === ""){
        next(errorHandler(400, 'All feilds are required'))
    }
    
    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            next(errorHandler(404, "User not found"))
        } 

        const validPassword = bcryptjs.compareSync(password, validUser.hashPassword)
        if(!validPassword){
            return next(errorHandler(400, "Invalid Password"))
            
        }

        const token = jwt.sign({ id: validUser._id }, process.env.jwtsecret);

        res.cookie('access-token', token, {
            httpOnly: true,
        });

        const { hashPassword:pass, ...rest } = validUser._doc
        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}

const google = async(req, res, next) => {
    const { name,email, googlePhotoUrl } = req.body

    try{
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({ id:user._id }, process.env.jwtsecret )
            const { hashPassword, ...rest } = user._doc
            res.status(200).cookie('access-token', token, {
                httpOnly:true,
            }).json(rest)
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10) 
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                hashPassword:hashedPassword,
                profilePicture:googlePhotoUrl
            })
            await newUser.save()
            const token = jwt.sign({ id:newUser._id }, process.env.jwtsecret)
            const { hashPassword, ...rest } = newUser._doc
            res.status(200).cookie('access-token', token, {
                httpOnly:true
            }).json(rest)
        }
    }
    catch(err){
        next(err)
    }
}

export { signup, signin, google }
