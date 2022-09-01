import { Router } from 'express';

import * as PostController from '../controllers/postController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/posts', PostController.all);
router.get('/users', UserController.all);
router.get('/posts/:id', PostController.one);

router.post('/posts', PostController.create);
router.post('/users', UserController.create);

router.put('/posts/:id', PostController.togglePost);
router.put('/users/:id', UserController.toggleUser);

router.delete('/posts/:id', PostController.deletePost);
router.delete('/users/:id', UserController.deleteUser);

export default router;