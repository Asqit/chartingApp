import { Typography } from '@material-tailwind/react';
import { FC } from 'react';

export interface ICustomTooltip {
	active: boolean;
	payload?: any[];
	label?: string;
}

/* 
+-------+------+-----------------------+
| Číslo | Typ  | Jednotka			   |			   
+---+---+------+-----------------------+
| 1 | Teplota  | Celsia				   |
| 2 | Vlhkost  | %	  				   |
| 3 | Světlo   | Lum                   |   
| 4 | Vítr     | m/s                   |    
| 5 | Tlak     | pascaly               |        
| 6 | Voda     | m3                    |  
| 7 | Plyn	   | m3					   |    
| 8 | Proud    | KW/H                  |       
+---+----------+-----------------------+
							Typy senzorů
*/

const CustomTooltip: FC<ICustomTooltip> = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 rounded-md">
				<Typography>Hodnota: {payload[0].value}</Typography>
				<Typography>
					Čas: {new Date(label!).toLocaleString()}
				</Typography>
			</div>
		);
	}

	return null;
};
export { CustomTooltip };
