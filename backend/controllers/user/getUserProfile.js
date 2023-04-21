import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// $-title   Get User Profile
// $-path    GET /api/v1/user/profile
// $-auth    Private

const getUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const userProfile = await User.findById(userId, {
		refreshToken: 0,
		roles: 0,
		_id: 0,
	}).lean();

	if (!userProfile) {
		res.status(204); //no content
		throw new Error('No Profile Found');
	}

	res.status(200).json({
		success: true,
		userProfile,
	});
});

export default getUserProfile;
