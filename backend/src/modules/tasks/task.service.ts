import { Request, Response } from "express";
import TaskModel from "../../models/tasks/task.model";
import { ERRORS } from "../../constants/strings.constants";

class TaskService {
  async getMyTasks(req: Request, res: Response): Promise<any> {
    try {
      const tasks = await TaskModel.find().populate("tags");
      res.status(200).send(tasks);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async createTask(req: Request, res: Response): Promise<any> {
    try {
      const task = new TaskModel(req.body);
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateTask(req: Request, res: Response): Promise<any> {
    try {
      const wall = await TaskModel.findOne({ status: WALL_STATUS.CURRENT }, { createdAt: 0, updatedAt: 0 });

      if (!wall) {
        return res.status(404).json({ error: ERRORS.wall.notFound });
      }

      return res.status(200).json(wall);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<any> {
    try {
      const wall = await TaskModel.findOne({ status: WALL_STATUS.CURRENT }, { createdAt: 0, updatedAt: 0 });

      if (!wall) {
        return res.status(404).json({ error: ERRORS.wall.notFound });
      }

      return res.status(200).json(wall);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new TaskService();
