import { Footer } from '../../components/Footer';
import { Nav } from '../../components/Nav';
import { Hero } from './components/hero/Hero';

function Homepage() {
	return (
		<>
			<Nav />
			<Hero />
			<Footer />
		</>
	);
}

export { Homepage };
