import { Request, Response } from 'express';
import * as postService from '../services/post.service';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const post = await postService.createPost({ title, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const post = await postService.updatePost(req.params.id, { title, content });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
};