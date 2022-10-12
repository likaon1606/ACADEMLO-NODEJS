import { Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/home/home.page';
import Login from './pages/login/login.page';
import Signup from './pages/signup/signup.page';

// Components
import Header from './components/ui/header/header.component';

import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usersActions } from './store/slices/user.slice';

const App = () => {
	const userId = localStorage.getItem('userId'),
				accountNumber = localStorage.getItem('accountNumber'),
				amount = localStorage.getItem('amount')

	const dispatch = useDispatch()

	useEffect(()=>{

		const user = {
			userId, accountNumber, amount
		}

		dispatch(usersActions.login(user))
	},[userId, accountNumber, amount, dispatch])

	return (
		<div>
			<Header />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route index path="/login" element={<Login />} />
				<Route index path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
};

export default App;