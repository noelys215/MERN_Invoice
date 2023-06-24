import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import DifferenceTwoToneIcon from '@mui/icons-material/DifferenceTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { StyledDashboardGrid } from '../../../components/StyledDashboardGrid';
import { StyledDivider } from '../../../components/StyledDivider';
import { useGetAllUserCustomersQuery } from '../../customers/customersApiSlice';
import { useGetAllMyDocsQuery } from '../../documents/documentsApiSlice';
import { addCurrencyCommas } from '../../documents/pages/components/addCurrencyCommas';
import { PaymentHistory } from './components/paymentHistory';
import { useTitle } from '../../../hooks/useTitle';

export const DashboardPage = () => {
	useTitle('My Dashboard - MERN Invoice');
	const { data: customers } = useGetAllUserCustomersQuery();
	const { data: documents } = useGetAllMyDocsQuery();

	let totalRecieved = 0;
	for (let i = 0; i < documents?.myDocuments?.length; i++) {
		if (documents?.myDocuments[i]?.totalAmountReceived !== undefined) {
			totalRecieved += documents?.myDocuments[i]?.totalAmountReceived;
		}
	}

	const docOverDue = documents?.myDocuments?.filter(
		(doc) => doc.dueDate <= new Date().toISOString()
	);

	let paymentHistory = [];
	for (let i = 0; i < documents?.myDocuments?.length; i++) {
		let history = [];
		if (documents?.myDocuments[i]?.paymentRecords !== undefined) {
			history = [...paymentHistory, documents?.myDocuments[i]?.paymentRecords];
			paymentHistory = [].concat.apply([], history);
		}
	}

	const sortPaymentHistory = paymentHistory.sort(function (a, b) {
		const c = new Date(a.datePaid);
		const d = new Date(b.datePaid);

		return d - c;
	});

	let totalAmount = 0;
	for (let i = 0; i < documents?.myDocuments?.length; i++) {
		totalAmount += documents?.myDocuments[i]?.total;
	}

	const fullyPaid = documents?.myDocuments?.filter((doc) => doc.status === 'Paid');
	const partiallyPaid = documents?.myDocuments?.filter((doc) => doc.status === 'Not Fully Paid');
	const notPaid = documents?.myDocuments?.filter((doc) => doc.status === 'Not Paid');

	return (
		<div>
			<></>
		</div>
	);
};
