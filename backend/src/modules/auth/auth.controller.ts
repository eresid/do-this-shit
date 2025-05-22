import { Router } from "express";
import service from "./auth.service";
import { AUTH_ROUTES } from "../../constants/routes.constants";

const router = Router();

router.post(AUTH_ROUTES.LOGIN, service.login);
router.post(AUTH_ROUTES.REGISTRATION, service.registration);
router.post(AUTH_ROUTES.RESET_PASSWORD, service.resetPassword);
router.post(AUTH_ROUTES.REFRESH_TOKEN, service.refreshToken);

export default router;
