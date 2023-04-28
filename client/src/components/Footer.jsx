import { Box, CssBaseline, Link, Typography } from '@mui/material';

import { FaMoneyBillWave } from 'react-icons/fa';

const Copyright = () => {
	return (
		<Typography variant="body2" align="center" sx={{ color: '#ffffff' }}>
			{'Copyright ©'}
			<Link color="inherit" href="https://github.com/noelys215/MERN_Invoice">
				MERN Invoice
			</Link>
			{new Date().getFullYear()} {'.'}
		</Typography>
	);
};

export const Footer = () => {
	return (
		<Box className="footer" sx={{ bgcolor: '#000000', marginTop: 'auto' }}>
			<CssBaseline />
			<Box component="footer" sx={{ py: 1, px: 1, mt: 'auto', bgColor: '#000000' }}>
				<Typography
					variant="subtitle1"
					align="center"
					component="p"
					sx={{ color: '#07f011' }}>
					<FaMoneyBillWave /> More Money, Less Problems. <FaMoneyBillWave />
				</Typography>
				<Copyright />
			</Box>
		</Box>
	);
};
