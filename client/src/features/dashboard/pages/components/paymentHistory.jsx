import {
	Paper,
	Table,
	TableContainer,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell } from '../../../../components/StyledTableCell';
import { StyledTableRow } from '../../../../components/StyledTableRow';
import { TablePaginationActions } from '../../../../components/TablePaginationActions';
import { addCurrencyCommas } from '../../../documents/pages/components/addCurrencyCommas';

export const paymentHistory = () => {
	return (
		<TableContainer component={Paper} sx={{ marginBottom: '100px', marginTop: '15px' }}>
			<div>paymentHistory</div>
		</TableContainer>
	);
};
