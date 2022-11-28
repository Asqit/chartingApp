import { useState } from 'react';

/**
 * **Description:** this function will try to safely store a value in `localStorage`.
 * If browser does not support `localStorage` or fails to use it, then the value will be store in `React.useState`
 *
 * **Note:** Its not my code. I found it somewhere in StackOverflow, but its awesome.
 */
function useSafeLocalStorage(key: string, initialValue: any) {
	const [valueProxy, setValueProxy] = useState(() => {
		try {
			const value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		try {
			window.localStorage.setItem(key, value);
			setValueProxy(value);
		} catch {
			setValueProxy(value);
		}
	};

	return [valueProxy, setValue];
}

export { useSafeLocalStorage };
