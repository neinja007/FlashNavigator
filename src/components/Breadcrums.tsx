import { Dispatch, Fragment, SetStateAction } from 'react';

type BreadcrumsProps = {
	groups: string[];
	setGroups: Dispatch<SetStateAction<string[]>>;
};

const Breadcrums = ({ groups, setGroups }: BreadcrumsProps) => {
	return (
		<div>
			{['', ...groups].slice(Math.max(groups.length - 2, 0)).map((group, i) => (
				<Fragment key={i}>
					<button
						onClick={() => setGroups((prev) => prev.slice(0, prev.length - (2 - i)))}
						className='mx-2 max-w-[150px] truncate rounded-lg border border-blue-800 bg-blue-950 px-2 py-1 text-white shadow-md shadow-blue-600 transition-all hover:text-xl hover:shadow-sky-300 active:bg-blue-900'
					>
						{group.replaceAll('_', ' ') || 'Home'}
					</button>
					{i !== Math.min(2, groups.length) && '>'}
				</Fragment>
			))}
		</div>
	);
};

export default Breadcrums;
