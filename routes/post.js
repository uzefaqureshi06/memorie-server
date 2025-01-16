import express from 'express'
import {getPost, updatePost,deletePost,likePost} from '../controller/post.js'
import {createPost} from '../controller/post.js'
import {auth} from '../middleware/auth.js'
const router = express.Router();
router.get('/', getPost)
router.post('/', createPost)
router.put('/:id' ,updatePost)
router.delete('/:id' ,deletePost)
router.patch('/:id/likePost',auth,likePost);
export default router;












