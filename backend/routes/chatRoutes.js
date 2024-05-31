import express from 'express';
import auth  from '../middlewares/authorise.js';
import { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from '../controllers/chatController.js';
// import { createChat,fetchChats } from '../controllers/chatController.js';


const router = express.Router();

// router.route('/').post(auth,createChat).get(auth,fetchChats);




router.route("/").post(auth, accessChat);
router.route("/").get(auth, fetchChats);
router.route("/group").post(auth, createGroupChat);
router.route("/rename").put(auth, renameGroup);
router.route("/groupremove").put(auth, removeFromGroup);
router.route("/groupadd").put(auth, addToGroup);

export default router