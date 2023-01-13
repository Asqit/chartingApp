import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * **Description:** This hook is used for authentication.
 * With each render of `Dashboard` component, this hook will sent a query to API, which then anwsers either with `401` or `200`.
 *
 * **note:** I cannot find more efficient way yet, so this is it for now.
 */
function useAuth() {
	const redirect = useNavigate();
	const [loading, setLoading] = useState(true);
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		(async () => {
			axios
				.get('/api/account/active')
				.then((resp) => {
					setUser(resp.data);
				})
				.catch((err) => {
					return redirect('/login');
				});

			setLoading(false);
		})();
	}, [redirect, setUser]);

	return loading;
}

export { useAuth };
