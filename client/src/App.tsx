import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Login, Register } from './pages';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
