import { createContext } from 'react';

export interface IUser {
	username: string;
	email: string;
}

export interface IUserContext {
	user: IUser | undefined;
	setUser: (user: IUser | undefined) => void;
}

const DEFAULT_STATE: IUserContext = {
	user: undefined,
	setUser: () => {},
};

const UserContext = createContext<IUserContext>(DEFAULT_STATE);

export { UserContext };
