import { Button, Typography } from '@material-tailwind/react';
import { useCookieWarning } from '../hooks/useCookieWarning';

function CookieWarning() {
	const { accepted, setAccepted } = useCookieWarning();

	return (
		<article
			className={`fixed z-50 bottom-0 left-0 w-full py-8 px-4 bg-white ${
				accepted ? 'hidden' : 'block'
			}`}
		>
			<Typography variant="h5">Tato stránka používá cookies</Typography>
			<Typography variant="paragraph">
				Tato webová aplikace využívá <code>cookies</code> pro svůj chod.
				Používáme pouze technické cookies tzn. cookies jsou použita
				pouze pro komunikaci mezi internímy servery. ( Pro vás zdroje
				dat )
			</Typography>
			<Button color="teal" size="sm" onClick={() => setAccepted(true)}>
				Dobře, teď vypadni
			</Button>
		</article>
	);
}

export { CookieWarning };
