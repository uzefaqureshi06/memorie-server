import mongoose from'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    creator: String,
    message: String,
    image: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0, // Initialize likeCount to 0
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const postMessage = mongoose.model('PostMessage', postSchema);
export default postMessage;
