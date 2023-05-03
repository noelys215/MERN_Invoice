import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button, Stack, Typography } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';

export const VerifiedPage = () => {
	useTitle('User Verification - MERN Invoice');
	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={2}
			height="94vh">
			<FaCheckCircle className="verified" />
			<Typography variant="h2" gutterBottom>
				Account Verified
			</Typography>

			<Typography variant="h5" component="div" gutterBottom>
				Account is verified and ready for use.
			</Typography>

			<Typography variant="h5" component="div" gutterBottom>
				Confirmation email has been sent
			</Typography>

			<Button startIcon={<LockOpenIcon />} endIcon={<LockOpenIcon />}>
				<Typography
					variant="h6"
					component={Link}
					to="/login"
					sx={{ textDecoration: 'none' }}>
					Please Login
				</Typography>
			</Button>
		</Stack>
	);
};
