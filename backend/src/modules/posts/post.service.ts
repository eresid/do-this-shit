import { Request, Response } from "express";
import PostModel from "../../models/posts/post.model";
import { ERRORS } from "../../constants/strings.constants";

class PostService {
  async getMyPosts(req: Request, res: Response): Promise<any> {
    try {
      const posts = await PostModel.find({ isArchived: false }).sort({ updatedAt: -1 });

      return res.status(200).json(posts);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async createPost(req: Request, res: Response): Promise<any> {
    try {
      const { title, content, type } = req.body;

      const newPost = await PostModel.create({
        title: title,
        content: content,
        type: type,
      });

      return res.status(200).json(newPost);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async updatePost(req: Request, res: Response): Promise<any> {
    try {
      const { title, content, type } = req.body;

      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).send({ error: ERRORS.posts.notFound });
      }

      post.title = title;
      post.content = content;
      post.type = type;

      await post.save();

      return res.status(200).send(post);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async deletePost(req: Request, res: Response): Promise<any> {
    try {
      await PostModel.findByIdAndDelete(req.params.id);

      return res.status(201).send();
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new PostService();
