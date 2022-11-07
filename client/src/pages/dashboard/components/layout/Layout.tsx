import { UserContext } from '../../../../context/userContext/userContext';
import { useContext } from 'react';
import blobs from '../../../../assets/images/pattern_blobs.png';
import { Sidebar } from './sidebar/Sidebar';
import { Content } from './content/Content';

function Layout({ logoutHandler }: { logoutHandler: () => void }) {
	const { user } = useContext(UserContext);

	return (
		<>
			<section className="w-full h-screen relative">
				<img
					src={blobs}
					className="hidden lg:block absolute object-cover -z-10 w-full h-32"
					alt="blobs pattern illustration"
				/>
				<div className="flex h-full lg:p-2 lg:gap-2">
					<Sidebar user={user} logoutHandler={logoutHandler} />
					<Content />
				</div>
			</section>
		</>
	);
}

export { Layout };
