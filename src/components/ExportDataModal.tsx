import ModalBackgroundFrame from './modals/ModalBackgroundFrame';

type ExportDataModalProps = {
	data: string;
	setData: (data: string) => void;
};

const ExportDataModal = ({ data, setData }: ExportDataModalProps) => {
	return (
		<>
			<ModalBackgroundFrame action={() => setData('')} />
			<div className='fixed bg-gray-700 shadow-lg rounded-xl inset-0 mx-auto my-auto w-[700px] h-fit'>
				<textarea
					readOnly
					value={data}
					className='rounded-t-lg w-full h-96 bg-gray-800 p-2'
					style={{ wordBreak: 'break-all' }}
				/>
				<button
					className='px-2 bg-blue-500 active:bg-blue-600 rounded-b-lg w-full py-1'
					onClick={() => navigator.clipboard.writeText(data)}
				>
					{'Copy Data'}
				</button>
			</div>
		</>
	);
};

export default ExportDataModal;
