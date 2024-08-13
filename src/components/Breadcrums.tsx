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
						className='max-w-[150px] truncate px-2 py-1 mx-2 rounded-lg bg-blue-800 text-white'
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
