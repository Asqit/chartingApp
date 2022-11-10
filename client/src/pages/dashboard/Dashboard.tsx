import { useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import axios from 'axios';
import { Loader } from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import { useCookieWarning } from '../../hooks/useCookieWarning';
import { CookieWarning } from '../../components/CookieWarning';

function Dashboard() {
	const { accepted } = useCookieWarning();
	const loading = useAuth();
	const redirect = useNavigate();

	const handleLogout = async () => {
		await axios.delete('/api/account/logout');
		redirect('/login');
	};

	console.log(accepted);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Layout logoutHandler={handleLogout} />
			{!accepted ? <CookieWarning /> : null}
		</>
	);
}

export { Dashboard };
