import { useSafeLocalStorage } from './useSafeLocalStorage';

function useCookieWarning() {
	const [accepted, setAccepted] = useSafeLocalStorage(
		'cookie-warning',
		false
	);

	return { accepted, setAccepted };
}

export { useCookieWarning };
