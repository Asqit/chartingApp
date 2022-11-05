import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext/userContext';
import jwtDecode from 'jwt-decode';

function useAuth() {
	const { user, setUser } = useContext(UserContext);
	const redirect = useNavigate();
	const [loading, setLoading] = useState(true);

	return loading;
}

export { useAuth };
