import Router from "express";
import userController from "../controllers/UserController";
import LoginRequired from "../middlewares/LoginRequired";

const router = new Router();

router.post("/", userController.store);
router.get("/", LoginRequired, userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
