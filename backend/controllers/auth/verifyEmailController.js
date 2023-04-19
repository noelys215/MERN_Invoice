import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import VerificationToken from '../../models/verifyResetTokenModel.js';
import sendEmail from '../../utils/sendEmail.js';

const domainURL = process.env.DOMAIN;

// $-title   Verify User Email
// $-path    GET /api/v1/auth/verify/:emailToken/:userId
// $-auth    Public

const verifyUserEmail = asyncHandler(async (req, res) => {
	const user = await User.findOne({ _id: req.params.userId }).select('-passwordConfirm');

	if (!user) {
		res.status(400);
		throw new Error('Unable to find user');
	}

	if (user.isEmailVerified) {
		res.status(400);
		throw new Error('User Already Verified');
	}

	const userToken = await VerificationToken.findOne({
		_userId: user._id,
		token: req.params.emailToken,
	});

	if (!userToken) {
		res.status(400);
		throw new Error('Token Invalid!');
	}

	user.isEmailVerified = true;
	await user.save();

	if (user.isEmailVerified) {
		const emailLink = `${domainURL}/login`;

		const payload = { name: user.firstName, link: emailLink };

		await sendEmail(
			user.email,
			'Welcome - Account Verified',
			payload,
			'./emails/template/welcome.handlebars'
		);

		res.redirect('/auth/verify');
	}
});

export default verifyUserEmail;
