import { Router } from "express";
import service from "./post.service";
import { POST_ROUTES } from "../../constants/routes.constants";

const router = Router();

router.get(POST_ROUTES.GET_MY_POSTS, service.getMyPosts);
router.post(POST_ROUTES.CREATE_POST, service.createPost);
router.put(POST_ROUTES.UPDATE_POST, service.updatePost);
router.delete(POST_ROUTES.DELETE_POST, service.deletePost);

export default router;
