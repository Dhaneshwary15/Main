import { Router } from "express";
// If the file is in `src/controllers/userController.ts`
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/", createUser); // This should now work
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
