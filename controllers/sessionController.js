const Session =require('../models/Session')
const Question =require ('../models/Question')

const createSession =async(req,res)=>{
    try {
        const {role,experience,topicsToFocus,description,questions}=req.body
        const userId=req.user._id
        const session=await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            description
        })
        const questionDocs=await Promise.all(
            questions.map(async(q)=>{
                const question=await Question.create({
                    session:session._id,
                    question:q.question,
                    answer: q.answer,               })
                return question._id
            })
        )
        session.questions=questionDocs
        await session.save()
        res.status(201).json({success:true,session})
    } catch (error) {
        res.status(500).json({success:false,message:'server error'})
    }
}
const getMySessions =async(req,res)=>{
    try {
        const sessions=await Session.find({user:req.user.id}).sort({createdAt:-1}).populate("questions")
       res.status(200).json({ success: true, sessions})
    } catch (error) {
        res.status(500).json({success:false,message:'server error'})
    }
}
const getSessionById =async(req,res)=>{
    try {
        const session=await Session.findById(req.params.id).populate({path:"questions",
            options:{sort:{isPinned:-1,createdAt:1}}
        }).exec()
        if(!session){
            return res.status(404).json({success:false,message:"session not found"})
        }
        res.status(200).json({success:true,session})
    } catch (error) {
        res.status(500).json({success:false,message:'server error'})
    }
}
const deleteSession = async (req, res) => {
    try {
         
        const session = await Session.findById(req.params.id)
        if (!session) {
            return res.status(404).json({ message: "session not found" });
        }
        // Use _id for user comparison
        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "not authorized to delete this session" });
        }
        await Question.deleteMany({ session: session._id });
        await session.deleteOne();
        res.status(200).json({ success: true, message: "session deleted successfully" });
    } catch (error) {
        console.error(error); // Add this for debugging
        res.status(500).json({ success: false, message: 'server error' });
    }
}
module.exports={createSession,getMySessions,getSessionById,deleteSession}