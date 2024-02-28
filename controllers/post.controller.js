const PostModel = require('../models/post.model')
const mongoose = require('mongoose');
module.exports.getPosts = async (req,res)=>{
    const user_id = req.user._id
    const posts = await PostModel.find({user_id}).sort({createdAt:-1})
    res.status(200).json(posts)
}
module.exports.getOnePost = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such post'})
    }
  
    const post = await PostModel.findById(id)
  
    if (!post) {
      return res.status(404).json({error: 'No such post'})
    }
    
    res.status(200).json(post)
  }
  
module.exports.setPosts = async (req,res)=>{
    if(!req.body.message){
        res.status(400).json({
            message:"merci d'ajouter un message"
        })
    }
    const user_id = req.user._id
    const post = await PostModel.create(
      {
        message : req.body.message,
        author :req.body.author,
        user_id
      }
    )
    res.status(200).json(post)
}
module.exports.editPost = async (req,res)  =>{
    const post = await PostModel.findById(req.params.id)
    if(!post){
        res.status(400).json({message:"ce post n'existe pas"})
    }
    const updatePost = await PostModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatePost)
}

module.exports.deletePost = async (req, res) => {
    try {
        const post = await PostModel.findOneAndDelete({ _id: req.params.id });
        
        if (!post) {
            return res.status(400).json({ message: "Le post n'existe pas" });
        }

        console.log("Suppression réussie :", post);
        res.status(200).json(post); // Envoyer l'objet post supprimé dans la réponse
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du post" });
    }
};

module.exports.likerPost = async (req,res)=>{
    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet:{likers:req.body.userId}},
            {new:true}
        ).then((data) => res.status(200).send(data))
    }
    catch(err){
        res.status(400).json(err)
    }
}
module.exports.DislikerPost = async (req,res)=>{
    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$pull:{likers:req.body.userId}},
            {new:true}
        ).then((data) => res.status(200).send(data))
    }
    catch(err){
        res.status(400).json(err)
    }
}
