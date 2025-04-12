import { Request, Response } from "express";
import TagModel from "../../models/tags/tag.model";
import { ERRORS } from "../../constants/strings.constants";

class TagService {
  async getMyTags(req: Request, res: Response): Promise<any> {
    try {
      const query = String(req.query.query || "");

      let tags;

      if (!query || query.trim() === "") {
        tags = await TagModel.find({
          isArchived: false,
        }).limit(20);
      } else {
        tags = await TagModel.find({
          name: { $regex: query, $options: "i" }, // case-insensitive
          isArchived: false,
        }).limit(20);
      }

      return res.status(200).json(tags);
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

  async deleteTag(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const deletedTag = await TagModel.findByIdAndDelete(id);

      if (!deletedTag) {
        return res.status(404).json({ message: ERRORS.tags.notFound });
      }

      return res.status(200).send();
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new TagService();
