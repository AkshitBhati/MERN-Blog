import { errorHandler } from "../utils/error.js"
import Comment from "../modals/comment.modal.js"

const createComment = async(req,res,next) => {
    try{
        const { content,postId,userId } = req.body
        if(userId !== req.user.id){
            return next(errorHandler(403,'You are not allowed to comment')) 
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()

        res.status(200).json(newComment)
    }
    catch(err){
        next(err)
    }
}

export { createComment }