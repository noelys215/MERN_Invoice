import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $-title   Delete User Account
// $-path    DELETE /api/v1/user/:id
// $-auth    Private/Admin
// Admin can delete any user account
const deleteUserAccount = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		const result = await user.remove();

		res.json({
			success: true,
			message: `User ${result.firstName} deleted successfully`,
		});
	} else {
		res.status(404);
		throw new Error('No User Found');
	}
});

export default deleteUserAccount;
