import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useAuth() {
	const redirect = useNavigate();
	const [loading, setLoading] = useState(true);
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		(async () => {
			axios.get('/api/account/active').catch((err) => {
				return redirect('/login');
			});

			setLoading(false);
		})();
	}, [redirect, setUser]);

	return loading;
}

export { useAuth };
