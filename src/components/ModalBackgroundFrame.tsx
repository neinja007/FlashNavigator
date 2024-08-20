import { MouseEventHandler } from 'react';

type ModalBackgroundFrameProps = {
	action?: MouseEventHandler<HTMLDivElement>;
};

const ModalBackgroundFrame = ({ action }: ModalBackgroundFrameProps) => {
	return <div className='fixed inset-0 z-10 h-full w-full bg-black opacity-25' onClick={action} />;
};

export default ModalBackgroundFrame;
