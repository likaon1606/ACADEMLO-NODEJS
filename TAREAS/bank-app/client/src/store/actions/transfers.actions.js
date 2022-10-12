import axios from 'axios';

import { transfersActions } from '../slices/transfers.slice';

const API_URL = 'http://localhost:4000/api/v1';

export const getUsersTransfers = userId => {
	return async dispatch => {
		try {

			const userTransferHistory = await axios.get(`${API_URL}/users/${userId}/history`)
	
			dispatch(transfersActions.getTransfers(userTransferHistory.data.data.transfersUser));

		} catch (error) {
			console.log(error);
		}
	};
};

export const newTransfer = (accountNumberReceiver, amountTransfer) => {
	return async dispatch => {
		try {
			const accountNumberSent = localStorage.getItem('accountNumber')
			const res = await axios.post(`${API_URL}/transfers`, { 
				accountNumberSent, accountNumberReceiver, amountTransfer 
			})
			dispatch(transfersActions.newTransfer());
		} catch (error) {
			console.log(error);
		}
	};
};