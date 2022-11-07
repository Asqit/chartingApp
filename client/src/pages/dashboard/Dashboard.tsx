import { useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import axios from 'axios';
import { Loader } from '../../components/Loader';
import { useAuth } from '../../useAuth';

function Dashboard() {
	const loading = useAuth();
	const redirect = useNavigate();

	const handleLogout = async () => {
		await axios.delete('/api/account/logout');
		redirect('/login');
	};

	if (loading) {
		return <Loader />;
	}

	return <Layout logoutHandler={handleLogout} />;
}

export { Dashboard };
