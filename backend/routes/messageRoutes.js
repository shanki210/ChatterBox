import express from "express";
import { allMessages, sendMessage } from "../controllers/messageController.js";
import auth from "../middlewares/authorise.js";
const router = express.Router();

router.route("/:chatId").get(auth, allMessages);
router.route("/").post(auth, sendMessage);

export default router;