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

export const App = () => {
	useTitle('MERN Invoice - Home');
	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<Footer />
			<ToastContainer theme="dark" />
		</ThemeProvider>
	);
};
