import { Router } from 'express';
import * as postController from '../controllers/post.controller';

const router = Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;