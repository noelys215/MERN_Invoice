import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { customTheme } from './customTheme';
import { useTitle } from './hooks/useTitle';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { VerifiedPage } from './features/auth/pages/VerifiedPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { Navbar } from './components/Navbar';
import { useSelector } from 'react-redux';
import { ResendEmailTokenPage } from './features/auth/pages/ResendEmailTokenPage';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	useTitle('MERN Invoice - Home');
	const { user } = useSelector((state) => state.auth);
	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			{user && <Navbar />}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="auth/verify" element={<VerifiedPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="resend" element={<ResendEmailTokenPage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<Footer />
			<ToastContainer theme="dark" />
		</ThemeProvider>
	);
};
