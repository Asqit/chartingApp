import * as controller from "../controllers/auth"
import { Router } from "express";

const router = Router();

router.post("/", controller.register);
router.post("/login", controller.login);


export default router;
