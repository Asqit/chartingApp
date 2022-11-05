import { Layout } from './components/layout/Layout';
import axios from 'axios';

function Dashboard() {
	const handleLogout = () => {
		axios
			.delete('/api/account/logout')
			.then((resp) => {})
			.catch((err) => {});
	};

	return <Layout logoutHandler={handleLogout} />;
}

export { Dashboard };
