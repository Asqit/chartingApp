import { useState, FC, ReactNode } from 'react';
import { DarkContext } from './darkContext';

const DarkProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [dark, setDark] = useState(false);

	return (
		<DarkContext.Provider value={{ dark, setDark }}>
			{children}
		</DarkContext.Provider>
	);
};

export { DarkProvider };
