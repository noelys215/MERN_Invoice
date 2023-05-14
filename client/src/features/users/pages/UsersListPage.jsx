import { Box, Typography } from '@mui/material';

export const UsersList = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				marginLeft: '250px',
				mt: 10,
			}}>
			<Typography variant="h3">Admin Only Page</Typography>
		</Box>
	);
};
