import { useEffect } from 'react';
import { usePrefersDarkMode } from './usePrefersDarkMode';
import { useSafeLocalStorage } from './useSafeLocalStorage';

/**
 * **Description:** This hook will evaluate which colorscheme is gonna be used.
 * It will evaluated based on `localStorage` entry or `OS` preferences.
 */
function useDarkMode() {
	const prefersDarkMode = usePrefersDarkMode();
	const [isEnabled, setIsEnabled] = useSafeLocalStorage(
		'dark-mode',
		undefined
	);

	const enabled = isEnabled === undefined ? prefersDarkMode : isEnabled;

	useEffect(() => {
		if (window === undefined) return;
		const root = window.document.documentElement;
		root.classList.remove(enabled ? 'light' : 'dark');
		root.classList.add(enabled ? 'dark' : 'light');
	}, [enabled]);

	return [enabled, setIsEnabled];
}

export { useDarkMode };
