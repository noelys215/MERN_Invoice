import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import getUserProfile from '../controllers/user/getUserProfile.js';
import updateUserProfile from '../controllers/user/updateUserProfile.js';
import deleteMyAccount from '../controllers/user/deleteMyAccount.js';

const router = express.Router();

router
	.route('/profile')
	.get(checkAuth, getUserProfile)
	.patch(checkAuth, updateUserProfile)
	.delete(checkAuth, deleteMyAccount);

export default router;
