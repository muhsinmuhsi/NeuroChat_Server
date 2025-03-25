import express from 'express';
import { getMessage, getUsersForSidebar, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/users',getUsersForSidebar);
router.get(':id/messages',getMessage);
router.post('/send/:id', sendMessage);

export default router;
