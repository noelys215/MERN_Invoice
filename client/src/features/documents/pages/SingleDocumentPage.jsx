import AttachEmailIcon from '@mui/icons-material/AttachEmail';

import EditIcon from '@mui/icons-material/Edit';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	CssBaseline,
	Grid,
	InputBase,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TextareaAutosize,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { NormalDivider } from '../../../components/NormalDivider';
import { Spinner } from '../../../components/Spinner';
import { StyledContainer } from '../../../components/StyledContainer';
import { StyledDivider } from '../../../components/StyledDivider';
import { StyledTableCell } from '../../../components/StyledTableCell';
import { StyledTableRow } from '../../../components/StyledTableRow';
import { useGetUserProfileQuery } from '../../users/usersApiSlice.js';
import { useGetSingleDocQuery } from '../documentsApiSlice';
import { addCurrencyCommas } from './components/addCurrencyCommas';
import { statusColor } from './components/styling';
import { PaymentForm } from './PaymentForm';

export const SingleDocumentPage = () => {
	/* Hooks */
	const { id } = useParams();
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	const { data: docData, isLoading } = useGetSingleDocQuery(id);
	const { data: profileData } = useGetUserProfileQuery();

	/* State */
	const [status, setStatus] = useState('');
	const [totalAmountReceived, setTotalAmountReceived] = useState(0);

	const [sendEmail, setSendEmail] = useState(false);

	const document = docData?.document;
	const profile = profileData?.userProfile;

	useEffect(() => {
		if (document) setStatus(document?.status);
	}, [document]);

	useEffect(() => {
		//Get total amount paid
		let totalReceived = 0;
		for (var i = 0; i < document?.paymentRecords?.length; i++) {
			totalReceived += Number(document?.paymentRecords[i]?.amountPaid);
			setTotalAmountReceived(totalReceived);
		}
	}, [document]);

	const sendPdfEmail = () => {
		setSendEmail(true);
		axios
			.post(`/api/v1/document/send-pdf`, {
				profile,
				document,
				status,
				totalAmountReceived,
			})
			.then(() => setSendEmail(false))
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Container component="main" maxWidth="md" sx={{ mt: 10 }}>
			<></>
		</Container>
	);
};
