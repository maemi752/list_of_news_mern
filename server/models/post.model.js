const {Schema, model, ObjectId} = require("mongoose");

const Post = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    img: {type: String},
    likes:[{type: ObjectId, ref: "User"}],
    by: {type: String}
})

module.exports = model('Post', Post)