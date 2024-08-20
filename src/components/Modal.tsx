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
					'fixed inset-0 z-50 mx-auto my-auto h-fit w-full max-w-[700px] overflow-hidden rounded-xl border text-left shadow-lg backdrop-brightness-50' +
					(padding ? ' p-5' : '')
				}
			>
				{children}
			</div>
		</>
	);
};

export default Modal;
