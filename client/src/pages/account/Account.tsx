import { Typography } from '@material-tailwind/react';
import { UserContext } from '../../context/userContext/userContext';
import { useContext } from 'react';

function Account() {
	const { user } = useContext(UserContext);

	return (
		<section>
			<article>
				<Typography variant="h2">Váš účet</Typography>
				<Typography variant="paragraph">
					Zde jsou všechny mimotechnické údaje o vašem účtu
				</Typography>
				<ul>
					<li>Uživatelské jméno: {user?.username || 'Neznámý'}</li>
					<li>Emailová adresa: {user?.email || 'Neznámý'}</li>
				</ul>
			</article>
		</section>
	);
}

export { Account };
