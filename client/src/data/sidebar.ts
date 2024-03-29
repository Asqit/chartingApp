import { BsBuilding, BsPerson, BsInfoCircle } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';

export const ulOptions = [
	{
		name: 'Pobočky',
		to: 'branches',
		icon: BsBuilding,
	},

	{
		name: 'Můj účet',
		to: 'account',
		icon: BsPerson,
	},

	{
		name: 'O aplikaci',
		to: 'about',
		icon: BsInfoCircle,
	},
	{
		name: 'Nastavení',
		to: 'settings',
		icon: CiSettings,
	},
];
