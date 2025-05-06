import Post, { IPost } from '../models/post.model';

export const createPost = async (postData: { title: string; content: string }): Promise<IPost> => {
  const post = new Post(postData);
  return post.save();
};

export const getPosts = async (): Promise<IPost[]> => {
  return Post.find().sort({ createdAt: -1 });
};

export const getPostById = async (id: string): Promise<IPost | null> => {
  return Post.findById(id);
};

export const updatePost = async (id: string, postData: { title?: string; content?: string }): Promise<IPost | null> => {
  return Post.findByIdAndUpdate(id, postData, { new: true });
};

export const deletePost = async (id: string): Promise<IPost | null> => {
  return Post.findByIdAndDelete(id);
};