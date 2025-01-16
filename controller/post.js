import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPost = async (req, res) => {
    try {
        const posts = await postMessage.find();
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    console.log(req.body)
    try { 
        const newPost = new postMessage(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: error.message });
    }
};


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const post =req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) 
            return res.status(404).send('No post with that id');  
    const updatedPost = await postMessage.findByIdAndUpdate(_id , post,{new:true})
    res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ message: error.message });
    }
    

};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No post with that id');

    try {
        await postMessage.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
   console.log(error)
    }

};


export const likePost =async(req,res) =>{
    const { id } =req.params
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No post with that id');

    const post =await postMessage.findById(id)
    const updatedPost = await postMessage.findByIdAndUpdate(id , {likeCount:post.likeCount + 1}, {new:true})
res.json(updatedPost)

}


    

