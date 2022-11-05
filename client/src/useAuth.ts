import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext/userContext';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useAuth() {
	const redirect = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			axios.get('/api/account/active').catch((err) => {
				return redirect('/login');
			});

			setLoading(false);
		})();
	}, [redirect]);

	return loading;
}

export { useAuth };
