// 3rd party components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context providers
import { DarkProvider } from './context/darkContext/DarkProvider';
import { UserProvider } from './context/userContext/UserProvider';

// Endpoints
import { Dashboard } from './pages/dashboard/Dashboard';
import { Homepage } from './pages/homapage/Homepage';
import { Branches } from './pages/branches/Branches';
import { Branch } from './pages/branch/Branch';
import { Lost } from './pages/lost/Lost';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { About } from './pages/about/About';
import { Settings } from './pages/settings/Settings';
import { Account } from './pages/account/Account';

function App() {
	return (
		<UserProvider>
			<DarkProvider>
				<BrowserRouter>
					<Routes>
						<Route path="*" element={<Lost />} />
						<Route path="/" element={<Homepage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />}>
							<Route path="branches" element={<Branches />} />
							<Route path="branches/:id" element={<Branch />} />
							<Route path="about" element={<About />} />
							<Route path="settings" element={<Settings />} />
							<Route path="account" element={<Account />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</DarkProvider>
		</UserProvider>
	);
}

export default App;
