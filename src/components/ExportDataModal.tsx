import ModalBackgroundFrame from './ModalBackgroundFrame';

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
				<div className='flex -mt-1'>
					<button
						className='px-2 bg-blue-500 active:bg-blue-600 rounded-bl-lg w-full py-1'
						onClick={() => navigator.clipboard.writeText(data)}
					>
						Copy Data
					</button>
					<button className='px-2 bg-red-500 active:bg-red-600 rounded-br-lg w-full py-1' onClick={() => setData('')}>
						Close
					</button>
				</div>
			</div>
		</>
	);
};

export default ExportDataModal;
