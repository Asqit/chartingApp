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
				<ul className="my-2 md:my-4">
					<li>
						<b>Uživatelské jméno:</b> {user?.username || 'Neznámý'}
					</li>
					<li>
						<b>Emailová adresa:</b> {user?.email || 'Neznámý'}
					</li>
				</ul>
			</article>
		</section>
	);
}

export { Account };
