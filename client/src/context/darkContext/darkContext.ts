import { createContext } from 'react';

export interface IDarkContext {
	dark: boolean;
	setDark?: (dark: boolean) => void;
}

const DEFAULT_STATE = {
	dark: false,
};

const DarkContext = createContext<IDarkContext>(DEFAULT_STATE);

export { DarkContext };
