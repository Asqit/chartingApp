import {
	Typography,
	Button,
	Tooltip,
	Switch,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { useState } from 'react';

function Settings() {
	const [modalOpen, setModalOpen] = useState(false);
	const handleModal = () => setModalOpen(!modalOpen);

	return (
		<section>
			<article>
				<Typography variant="h2">Nastavení</Typography>
				<div className="flex flex-wrap justify-evenly items-center gap-8">
					<div className="w-full border shadow-sm rounded-2xl flex justify-between items-center p-2">
						<Typography>Temný režim</Typography>
						<Switch color="teal" />
					</div>
					<div className="w-full border shadow-sm rounded-2xl flex justify-between items-center p-2">
						<Typography>Smazání účtu</Typography>
						<Tooltip content="Pozor:Tato akce nelze vrátit">
							<Button
								color="red"
								variant="outlined"
								onClick={handleModal}
							>
								smazat
							</Button>
						</Tooltip>
						<Dialog open={modalOpen} handler={handleModal}>
							<DialogHeader>Pozor</DialogHeader>
							<DialogBody divider>
								Tato akce se nedá odvolat. Jste si jistý ?
							</DialogBody>
							<DialogFooter>
								<Button
									variant="text"
									color="red"
									onClick={handleModal}
									className="mr-1"
								>
									<span>ne</span>
								</Button>
								<Button
									variant="gradient"
									color="green"
									onClick={handleModal}
								>
									<span>ano</span>
								</Button>
							</DialogFooter>
						</Dialog>
					</div>
				</div>
			</article>
		</section>
	);
}

export { Settings };
