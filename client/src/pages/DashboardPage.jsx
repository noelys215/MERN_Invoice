import { Box, Typography } from '@mui/material';

export const DashboardPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				marginLeft: '250px',
				mt: 10,
			}}>
			<Typography variant="h3">This page is for logged in users only</Typography>
		</Box>
	);
};
