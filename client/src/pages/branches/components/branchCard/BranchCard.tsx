import {
	Card,
	CardBody,
	CardFooter,
	Typography,
} from '@material-tailwind/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface IBranchCard {
	id: number;
	name: string;
	location: string;
	phone: string;
}

const BranchCard: FC<IBranchCard> = ({ id, name, location, phone }) => {
	return (
		<Card className="w-64 border" shadow={false}>
			<CardBody className="text-center">
				<Typography variant="h5" className="mb-2">
					{name}
				</Typography>
				<Typography>{location}</Typography>
				<Typography>{phone}</Typography>
			</CardBody>
			<CardFooter divider className="text-center py-3">
				<Typography variant="small" color="teal">
					<Link to={String(id)} state={{ id, name, location, phone }}>
						Přejít
					</Link>
				</Typography>
			</CardFooter>
		</Card>
	);
};

export { BranchCard };
