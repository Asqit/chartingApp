import { Tooltip, Typography } from '@material-tailwind/react';

function About() {
	return (
		<section className="w-full h-full">
			<article className="container max-w-4xl">
				<Typography variant="h2">Měření a Regulace</Typography>
				<Typography variant="small" className="my-2">
					MaR nebo také Měření a Regulace je webová aplikace, která má
					za úkol zpřehlednit vaše data. Aplikace je tvořená ze
					čtyřech částí. První část tvoří webová aplikace, právě ta,
					kterou teď vydíte. Druhou částí je API pro webovou aplikaci,
					to zpracovává věci ohledně zpracování dat. Třetí je
					databáze. A nakonec čtvrtá a to je IoT, nebo také internet
					svět věcí.
				</Typography>
				<ul>
					<li>
						<Tooltip
							content="6.6.2022"
							animate={{
								mount: { scale: 1, y: 0 },
								unmount: { scale: 0, y: 25 },
							}}
						>
							<span>
								<b>Verze: </b>1.0.0
							</span>
						</Tooltip>
					</li>
					<li>
						<b>Web & API:</b> Ondřej Tuček
					</li>
					<li>
						<b>IoT/HW:</b> Tomáš Tuček
					</li>
				</ul>
			</article>
		</section>
	);
}

export { About };
