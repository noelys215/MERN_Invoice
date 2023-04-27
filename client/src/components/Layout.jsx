import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
	return (
		<Box>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Outlet />
			</Box>
		</Box>
	);
};
