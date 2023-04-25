import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import getUserProfile from '../controllers/user/getUserProfile.js';
import updateUserProfile from '../controllers/user/updateUserProfile.js';
import deleteMyAccount from '../controllers/user/deleteMyAccount.js';
import getAllUserAccounts from '../controllers/user/getAllUserAccounts.js';
import role from '../middleware/roleMiddleware.js';
import deleteUserAccount from '../controllers/user/deleteUserAccount.js';
import deactivateUser from '../controllers/user/deactivateUser.js';

const router = express.Router();

router
	.route('/profile')
	.get(checkAuth, getUserProfile)
	.patch(checkAuth, updateUserProfile)
	.delete(checkAuth, deleteMyAccount);

router.route('/all').get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccounts);

router.route('/:id').delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount);

router.route('/:id/deactivate').patch(checkAuth, role.checkRole(role.ROLES.Admin), deactivateUser);

export default router;
