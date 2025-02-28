import { Router } from "express";
import service from "./task.service";
import { TASK_ROUTES } from "../../constants/routes.constants";

const router = Router();

router.get(TASK_ROUTES.GET_MY_TASKS, service.getMyTasks);
router.post(TASK_ROUTES.CREATE_TASK, service.createTask);
router.put(TASK_ROUTES.UPDATE_TASK, service.updateTask);
router.delete(TASK_ROUTES.DELETE_TASK, service.deleteTask);

export default router;
