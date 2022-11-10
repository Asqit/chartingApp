// 3rd party components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context providers
import { UserProvider } from './context/userContext/UserProvider';

// Endpoints
import { Dashboard } from './pages/dashboard/Dashboard';
import { Branches } from './pages/branches/Branches';
import { Branch } from './pages/branch/Branch';
import { Lost } from './pages/lost/Lost';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { About } from './pages/about/About';
import { Account } from './pages/account/Account';
import { Settings } from './pages/settings/Settings';

import { useDarkMode } from './hooks/useDark';
import { useEffect, useState } from 'react';
import { CookieWarning } from './components/CookieWarning';

function App() {
	useDarkMode(); // automatically switch to darkmode if prefered
	return (
		<>
			<UserProvider>
				<BrowserRouter>
					<Routes>
						<Route path="*" element={<Lost />} />
						<Route path="/" element={<Dashboard />} />
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
			</UserProvider>
		</>
	);
}

export default App;
