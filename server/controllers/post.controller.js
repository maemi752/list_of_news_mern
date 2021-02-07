const mongoose = require('mongoose');
const Post = require("../models/post.model.js");

class postController {
    async get_posts(req, res) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 5
            let offset = page * limit - limit      
            let postsList = await Post.find().sort( { "_id": -1 } ).skip(offset).limit(limit);
            let posts = await Post.find();          
            res.status(200).json(Object.assign({postsList: postsList}, {total_count: posts.length}));
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async create(req, res) {
        const { title, text, img, likeCount, by } = req.body;

        const newPostMessage = new Post({ title, text, img, likeCount, by })
    
        try {
            await newPostMessage.save();
    
            res.status(201).json(newPostMessage );
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }

    async get_post(req, res) {

        const { id } = req.params;

        try {
            const post = await Post.findById(id);
            
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async like(req, res) {
        const { id, user_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        
        const post = await Post.findById(id);

        const updatedPost = await Post.findByIdAndUpdate(id, { like: post.like + 1 }, { new: true });
        
        res.json(updatedPost);
    }

    async like(req, res) {

        const {  id } = req.params;
        const { user_id } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = await Post.findByIdAndUpdate(id, { $push: {likes: user_id}}, {new: true})
        res.json(updatedPost);
    }

    async unlike(req, res) {
        const {  id } = req.params;
        const { user_id } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = await Post.findByIdAndUpdate(id,{ $pull: {likes: user_id }}, {new: true})
        res.json(updatedPost);
    }

    async delete(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
        await Post.findByIdAndRemove(id);
    
        res.json({ message: "Post deleted successfully." });
    }

}

module.exports = new postController()