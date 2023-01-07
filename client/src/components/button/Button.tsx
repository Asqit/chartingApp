import { ReactNode } from 'react';

interface IButtonProps {
	children: ReactNode;
}

export default function Button(props: IButtonProps) {
	const { children } = props;

	return <>{children}</>;
}
