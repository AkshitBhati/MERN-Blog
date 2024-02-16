import Post from "../modals/post.modal.js"
import { errorHandler } from "../utils/error.js"

const create = async(req,res,next) => {
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide all the required feild'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace('/[^a-zA-Z0-9-]/g', '-')
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    }) 
    try{
        const savedPost = await newPost.save()
        res.status(201).json({
            savedPost
        })
    }
    catch(err){
        next(err.message)
    }
}

export { create }