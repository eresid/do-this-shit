import { Request, Response } from "express";
import PostModel from "../../models/posts/post.model";
import { ERRORS } from "../../constants/strings.constants";

class PostService {
  async getMyPosts(req: Request, res: Response): Promise<any> {
    try {
      const posts = await PostModel.find({ isArchived: false });

      return res.status(200).json(posts);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async createPost(req: Request, res: Response): Promise<any> {
    try {
      const { title, content } = req.body;

      const newPost = await PostModel.create({
        title: title,
        content: content,
      });

      return res.status(200).json(newPost);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async updatePost(req: Request, res: Response): Promise<any> {
    try {
      const { title, content } = req.body;

      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).send({ error: ERRORS.posts.notFound });
      }

      post.title = title;
      post.content = content;

      await post.save();

      return res.status(200).send(post);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async deletePost(req: Request, res: Response): Promise<any> {
    // try {
    //   const wall = await PostModel.findOne({ status: WALL_STATUS.CURRENT }, { createdAt: 0, updatedAt: 0 });
    //   if (!wall) {
    //     return res.status(404).json({ error: ERRORS.posts.notFound });
    //   }
    //   return res.status(200).json(wall);
    // } catch (error: any) {
    //   console.error(error.message);
    //   return res.status(500).json({ error: error.message });
    // }
  }
}

export default new PostService();
