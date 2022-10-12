import axios from 'axios';

import { usersActions } from '../slices/user.slice';

const API_URL = 'http://localhost:4000/api/v1';

export const login = (accountNumber, password) => {
	return async dispatch => {
		try {
			const loginUser = await axios.post(`${API_URL}/users/login`, { accountNumber, password })

			const user = {
				userId: loginUser.data.data.userId,
				amount: loginUser.data.data.amount,
				accountNumber: loginUser.data.data.accountNumber,
				name: loginUser.data.data.name
			}

			localStorage.setItem("userId", user.userId)
			localStorage.setItem("accountNumber", user.accountNumber)
			localStorage.setItem("amount", user.amount)
			localStorage.setItem("name", user.name)


			dispatch(usersActions.login(user));
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = (name, password) => {
	return async dispatch => {
		try {
			const res = await axios.post(`${API_URL}/users/signup`, {
				name, password
			})


			const userCreated = {
				userId: res.data.data.userId,
				amount: res.loginUser.data.data.amount,
				accountNumber: res.loginUser.data.data.accountNumber,
				name: res.data.data.name
			}

			dispatch(usersActions.login(userCreated))

			localStorage.setItem("userId", userCreated.userId)
			localStorage.setItem("accountNumber", userCreated.accountNumber)
			localStorage.setItem("amount", userCreated.amount)
		} catch (error) {
			console.log(error);
		}
	};
};

export const logout = () => {
	return async dispatch => {
		try {

			localStorage.clear()

			dispatch(usersActions.logout());
		} catch (error) {
			console.log(error);
		}
	};
};