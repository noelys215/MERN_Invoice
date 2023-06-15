import styled from '@emotion/styled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FaceIcon from '@mui/icons-material/Face';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { produce } from 'immer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
	Box,
	Button,
	Chip,
	Container,
	CssBaseline,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NormalDivider } from '../../../components/NormalDivider';
import { Spinner } from '../../../components/Spinner';
import { StyledContainer } from '../../../components/StyledContainer';
import { StyledDivider } from '../../../components/StyledDivider';
import { StyledTableCell } from '../../../components/StyledTableCell';
import { StyledTableRow } from '../../../components/StyledTableRow';
import currencies from '../../../world_currencies.json';
import {
	useCreateDocMutation,
	useGetSingleDocQuery,
	useUpdateDocMutation,
} from '../documentsApiSlice';

import { useGetAllUserCustomersQuery } from '../../customers/customersApiSlice';
import { addCurrencyCommas } from './components/addCurrencyCommas';
import DocumentType from './components/DocumentType';
import { docInitialState, itemsInitialState } from './initialState';

const StyledItemButton = styled(Button)({
	boxShadow: '0 0 0 0 #f0f0f0, 0 0 0 0 rgba(124, 105, 239, 1)',
});

export const DocCreateEditForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: customers } = useGetAllUserCustomersQuery();
	const { data: singleDoc } = useGetSingleDocQuery(id);

	const [createDoc, { isLoading, isSuccess }] = useCreateDocMutation();

	const [
		updateDoc,
		{ isLoading: updateDocLoading, isSuccess: updateDocSuccess, data: updateDocData },
	] = useUpdateDocMutation();

	const goBack = () => navigate(-1);

	const [docData, setDocData] = useState(docInitialState);
	const [items, setItems] = useState(itemsInitialState);
	const [documentType, setDocumentType] = useState('Invoice');

	const [currency, setCurrency] = useState(currencies[0].code);

	const today = new Date();

	const [dueDate, setDueDate] = useState(today.getTime() + 7 * 24 * 60 * 60 * 1000);

	const [customer, setCustomer] = useState(null);
	const [salesTax, setSalesTax] = useState(0);
	const [total, setTotal] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [rates, setRates] = useState(0);
	const [status, setStatus] = useState('Not Paid');

	useEffect(() => {
		if (isSuccess) {
			navigate('/documents');
			toast.success('Your document was created successfully');
		}
		if (updateDocSuccess) {
			navigate('/documents');
			const message = updateDocData?.message;
			toast.success(message);
		}
	}, [navigate, isSuccess, updateDocSuccess, updateDocData]);

	const doc = singleDoc?.document;

	useEffect(() => {
		if (doc) {
			setDocData(doc);
			setItems(doc.billingItems);
			setSubTotal(doc.subTotal);
			setSalesTax(doc.salesTax);
			setTotal(doc.total);
			setCurrency(doc.currency);
			setRates(doc.rates);
			setCustomer(doc.customer);
		}
	}, [doc]);

	useEffect(() => {
		documentType === 'Receipt' ? setStatus('Paid') : setStatus('Not Paid');
	}, [documentType]);

	const handleAddBillingItemsRow = (e) => {
		e.preventDefault();
		const insertAt = 0;
		const nextItems = [
			...items.slice(0, insertAt),
			{
				itemName: '',
				unitPrice: '',
				quantity: '',
				discount: '',
			},
			...items.slice(insertAt),
		];
		setItems(nextItems);
	};

	const handleRates = (e) => setRates(e.target.value);

	useEffect(() => {
		const subTotal = () => {
			let amtArr = document.getElementsByName('amount');
			let subtotal = 0;
			for (let i = 0; i < amtArr.length; i++) {
				if (amtArr[i].value) {
					subtotal += +amtArr[i].value;
				}

				setSubTotal(subtotal);
			}
		};

		subTotal();
	}, [docData, items]);

	useEffect(() => {
		const total = () => {
			const finalTotal = (rates / 100) * subTotal + subTotal;
			setSalesTax((rates / 100) * subTotal);
			setTotal(finalTotal);
		};
		total();
	}, [docData, items, rates, subTotal]);

	const createUpdateDocHandler = async (e) => {
		e.preventDefault();
		if (doc) {
			try {
				await updateDoc({
					id: doc._id,
					...docData,
					billingItems: [...items],
					documentType,
					customer,
					dueDate,
					salesTax,
					subTotal,
					total,
					rates,
					currency,
					status,
				});
			} catch (err) {
				const message = err.data.message;
				toast.error(message);
			}
		} else {
			try {
				await createDoc({
					...docData,
					billingItems: [...items],
					documentType,
					customer,
					dueDate,
					salesTax,
					subTotal,
					total,
					rates,
					currency,
					status,
					paymentRecords: [],
				});
			} catch (err) {
				const message = err.data.message;
				toast.error(message);
			}
		}
	};
	return (
		<div>
			<></>
		</div>
	);
};
