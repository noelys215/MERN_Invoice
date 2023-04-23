import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $-title   Delete My Account
// $-path    DELETE /api/v1/user/profile
// $-auth    Private

const deleteMyAccount = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	/* Find user by ID and delete */
	await User.findByIdAndDelete(userId);

	res.json({ success: true, message: 'Account has been deleted' });
});

export default deleteMyAccount;
