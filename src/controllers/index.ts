import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model';
export const postController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const post = new Post();
      if (
        !req.body.title.trim('') ||
        !req.body.body.trim('') ||
        !req.body.author.trim('')
      ) {
        return res.status(400).json({
          message: 'required fields',
        });
      }
      const newPost = await post.create(req.body);
      return res.status(200).json({
        message: 'successfully post created',
        data: { ...newPost },
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const post = new Post();
      const posts = await post.getAllPosts();
      res.status(200).json({ data: posts });
    } catch (error) {
      next(error);
    }
  },
  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const postModel = new Post();
      const post = await postModel.getPost(id);
      res.status(200).json({ message: 'ok', data: { ...post } });
    } catch (error) {
      next(error);
    }
  },
  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = new Post();
      const updatedPost = await post.updatePost({ ...req.body, id });
      res.status(200).json({
        message: 'successfully updated user',
        data: { ...updatedPost },
      });
    } catch (error) {
      next(error);
    }
  },
  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = new Post();
      const deletedPost = await post.deletePost(id);
      res.status(200).json({
        message: 'successfully deleted post',
        data: { ...deletedPost },
      });
    } catch (error) {
      next(error);
    }
  },
};
