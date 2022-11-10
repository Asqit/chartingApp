import { UserContext } from '../../../../context/userContext/userContext';
import { useContext } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { Content } from './content/Content';

function Layout({ logoutHandler }: { logoutHandler: () => void }) {
	const { user } = useContext(UserContext);

	return (
		<>
			<section className="w-full h-screen">
				<div className="flex h-full">
					<Sidebar user={user} logoutHandler={logoutHandler} />
					<Content />
				</div>
			</section>
		</>
	);
}

export { Layout };
