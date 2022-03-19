import { postController } from '../controllers';
import { Router } from 'express';
const router = Router();

router.post('/posts', postController.create);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

export default router;
