import { Request, Response } from "express";
import TagModel from "../../models/tags/tag.model";

class TagService {
  async getMyTags(req: Request, res: Response): Promise<any> {
    try {
      const tasks = await TagModel.find({ isArchived: false });

      return res.status(200).json(tasks);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async createTag(req: Request, res: Response): Promise<any> {
    try {
      const { name, color } = req.body;

      const newTag = await TagModel.create({
        name: name,
        color: color,
      });

      return res.status(200).json(newTag);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async updateTag(req: Request, res: Response): Promise<any> {}

  async deleteTag(req: Request, res: Response): Promise<any> {}
}

export default new TagService();
