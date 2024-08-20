import { MouseEventHandler } from 'react';
import ModalBackgroundFrame from './ModalBackgroundFrame';

type ModalProps = {
	action?: MouseEventHandler<HTMLDivElement>;
	children: React.ReactNode;
	padding?: boolean;
};

const Modal = ({ children, action, padding }: ModalProps) => {
	return (
		<>
			<ModalBackgroundFrame action={action} />
			<div
				className={
					'fixed z-50 bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit text-left' +
					(padding ? ' p-5' : '')
				}
			>
				{children}
			</div>
		</>
	);
};

export default Modal;
