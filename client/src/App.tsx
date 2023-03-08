import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
	Dashboard,
	Homepage,
	Index,
	Login,
	Register,
	About,
	Settings,
	Account,
	Branches,
	Branch,
	Lost,
} from './views';

export default function App() {
	return (
		<main>
			<Route index element={<Homepage />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="/dashboard" element={<Dashboard />}>
				<Route index element={<Index />} />
				<Route path="about" element={<About />} />
				<Route path="settings" element={<Settings />} />
				<Route path="account" element={<Account />} />
				<Route path="branches" element={<Branches />}>
					<Route path=":id" element={<Branch />} />
				</Route>
			</Route>
			<Route path="*" element={<Lost />} />
			<ToastContainer />
		</main>
	);
}
