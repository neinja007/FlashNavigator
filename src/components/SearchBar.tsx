type SearchBarProps = {
	searchBarQuery: string;
	setSearchBarQuery: (query: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	nextResult: () => void;
};

const SearchBar = ({ searchBarQuery, setSearchBarQuery, onSubmit, nextResult }: SearchBarProps) => {
	return (
		<form onSubmit={onSubmit}>
			<input
				type='text'
				placeholder='FlashSearch'
				className='mt-4 w-full max-w-[500px] rounded-full border bg-transparent p-3 px-5 text-xl'
				autoFocus
				value={searchBarQuery}
				onChange={(e) => {
					setSearchBarQuery(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === 'Tab') {
						e.preventDefault();
						nextResult();
					}
				}}
				onSubmit={() => setSearchBarQuery('')}
			/>
		</form>
	);
};

export default SearchBar;
