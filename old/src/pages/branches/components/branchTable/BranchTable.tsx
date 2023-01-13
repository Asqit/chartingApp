import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IBranch } from '../../models/branch';

export interface IBranchtable {
	cells: IBranch[];
}

const BranchTable: FC<IBranchtable> = ({ cells }) => {
	return (
		<table className="w-full text-center border">
			<tbody>
				<tr className="bg-teal-300 text-white">
					<th className="border p-2">Jméno</th>
					<th className="border p-2">Lokace</th>
					<th className="border p-2">Telefon</th>
					<th className="border p-2">Odkaz</th>
				</tr>
				{cells.map((cell, index) => {
					return (
						<tr
							key={index}
							className="even:bg-blue-gray-300 even:text-white"
						>
							<td className="border p-1">{cell.name}</td>
							<td className="border p-1">{cell.location}</td>
							<td className="border p-1">+420 {cell.phone}</td>
							<td className="border p-1">
								<Link
									className="font-semibold hover:underline"
									state={{ ...cell }}
									to={String(cell.id)}
								>
									Přejít
								</Link>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export { BranchTable };
