import { Router } from "express";
import service from "./tag.service";
import { TAG_ROUTES } from "../../constants/routes.constants";

const router = Router();

router.get(TAG_ROUTES.GET_MY_TAGS, service.getMyTags);
router.post(TAG_ROUTES.CREATE_TAG, service.createTag);
router.put(TAG_ROUTES.UPDATE_TAG, service.updateTag);
router.delete(TAG_ROUTES.DELETE_TAG, service.deleteTag);

export default router;
