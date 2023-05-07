import { Box, Button, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { FaSignInAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleLogin } from '../../../components/GoogleLogin';
import { StyledDivider } from '../../../components/StyledDivider';
import { AuthWrapper } from '../forms/AuthWrapper';
import { LoginForm } from '../forms/LoginForm';

export const LoginPage = () => {
	return (
		<AuthWrapper>
			<Container
				component="main"
				maxWidth="sm"
				sx={{
					border: '2px solid #e4e5e7',
					borderRadius: '25px',
					py: 2,
				}}>
				<Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<FaSignInAlt className="auth-svg" />
							<Typography variant="h1">Log In</Typography>
						</Box>
						<StyledDivider />
					</Grid>
					{/* Login Form */}
					<LoginForm />
					{/* or Google sign-in */}
					<Grid item xs={12}>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								mt: 2,
							}}>
							<Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
							<Button
								variant="outlined"
								sx={{
									cursor: 'unset',
									m: 1,
									py: 0.5,
									px: 7,
									borderColor: 'grey !important',
									color: 'grey !important',
									fontWeight: 500,
									borderRadius: '25px',
								}}
								disableRipple
								disabled>
								OR LOG In WITH GOOGLE
							</Button>
							<Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<GoogleLogin />
						</Box>
					</Grid>
					<Divider sx={{ flexGrow: 1, mb: 1, mt: 1 }} orientation="horizontal" />
					{/* Forgot Password */}
					<Grid item xs={12}>
						<Box
							sx={{
								justifyContent: 'center',
								display: 'flex',
								alignItems: 'center',
							}}>
							<Typography variant="h6">
								No Account?&nbsp;
								<Link
									variant="h6"
									component={RouterLink}
									to="/register"
									sx={{ textDecoration: 'none' }}>
									Sign Up Here
								</Link>
							</Typography>
						</Box>
					</Grid>
					<Divider sx={{ flexGrow: 1, mb: 1, mt: 1 }} orientation="horizontal" />
					{/* Resend email verification */}
					<Grid item xs={12}>
						<Box
							sx={{
								justifyContent: 'center',
								display: 'flex',
								alignItems: 'center',
							}}>
							<Typography variant="h6">
								No Verification Email?&nbsp;
								<Link
									variant="h6"
									component={RouterLink}
									to="/resend"
									sx={{ textDecoration: 'none' }}>
									Resend Email
								</Link>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</AuthWrapper>
	);
};
