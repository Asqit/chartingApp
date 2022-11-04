import {
	Button,
	Dialog,
	DialogBody,
	DialogHeader,
	DialogFooter,
} from '@material-tailwind/react';
import { useState, FC, ReactNode } from 'react';

export interface IErrorModal {
	error: string;
	open: boolean;
	header?: string;
	children?: ReactNode;
	onClose?: () => void;
	onOpen?: () => void;
	onYes?: () => void;
	onNo?: () => void;
}

const ErrorModal: FC<IErrorModal> = ({
	error,
	open,
	header,
	children,
	onClose,
	onOpen,
	onYes,
	onNo,
}) => {
	const [modalOpen, setModalOpen] = useState(open);

	const modalHandler = () => {
		if (modalOpen && onClose) {
			onClose();
		}

		if (!modalOpen && onOpen) {
			onOpen();
		}

		setModalOpen(!modalOpen);
	};

	const handleYes = () => {
		if (onYes) {
			onYes();
		}
		modalHandler();
	};

	const handleNo = () => {
		if (onNo) {
			onNo();
		}
		modalHandler();
	};

	return (
		<Dialog open={modalOpen} handler={modalHandler}>
			<DialogHeader>{header}</DialogHeader>
			<DialogBody>{children ? children : error}</DialogBody>
			<DialogFooter>
				<Button onClick={handleNo}>ne</Button>
				<Button onClick={handleYes}>ano</Button>
			</DialogFooter>
		</Dialog>
	);
};

ErrorModal.defaultProps = {
	error: 'Sample text',
	open: false,
	header: 'Nastala chyba',
};

export { ErrorModal };
