import { useState, FC, ReactNode } from 'react';
import { IUser, UserContext } from './userContext';

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<IUser | undefined>(undefined);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider };
