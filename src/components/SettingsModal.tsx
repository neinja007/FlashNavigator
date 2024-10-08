import { Dispatch, SetStateAction, useContext } from 'react';
import { DataContext } from '@/context/DataContext';
import Modal from './Modal';
import SubmitButton from './SubmitButton';
import { Settings } from 'lucide-react';

type SettingsModalProps = {
	setSettingsModal: Dispatch<SetStateAction<boolean>>;
};

const SettingsModal = ({ setSettingsModal }: SettingsModalProps) => {
	const { settings, updateSettings } = useContext(DataContext);

	return (
		<Modal action={() => setSettingsModal(false)} padding>
			<form className='space-y-5' onSubmit={() => setSettingsModal(false)}>
				<div className='flex justify-between'>
					<div className='flex items-center text-xl font-bold'>
						<Settings className='mr-2' /> Settings
					</div>
					<SubmitButton />
				</div>
				<div>
					<input
						type='checkbox'
						id='hide_shortcut_icons'
						checked={settings.hideShortcutIcons}
						onChange={(e) => updateSettings('hideShortcutIcons', e.target.checked)}
						className='mr-2'
					/>
					<label htmlFor='hide_shortcut_icons'>Hide Icons next to Shortcuts (📁 and 🔗)</label>
				</div>
				<div>
					<input
						type='checkbox'
						id='hide_empty_shortcuts'
						checked={settings.hideEmptyShortcuts}
						onChange={(e) => updateSettings('hideEmptyShortcuts', e.target.checked)}
						className='mr-2'
					/>
					<label htmlFor='hide_empty_shortcuts'>Hide Empty Shortcuts</label>
				</div>
				<div>
					<input
						type='checkbox'
						id='shortcut_type_color'
						checked={settings.shortcutTypeColor}
						onChange={(e) => updateSettings('shortcutTypeColor', e.target.checked)}
						className='mr-2'
					/>
					<label htmlFor='shortcut_type_color'>Different colors for Folders and Links</label>
				</div>
				<div>
					<label htmlFor='search_engine'>Search Engine:</label>
					<select
						id='search_engine'
						value={settings.searchEngine}
						onChange={(e) => updateSettings('searchEngine', e.target.value)}
						className='ml-2 rounded-md border bg-black px-2'
					>
						<option value='duckduckgo'>DuckDuckGo</option>
						<option value='bing'>Bing</option>
						<option value='google'>Google</option>
						<option value='other'>Other</option>
					</select>
				</div>
			</form>
		</Modal>
	);
};

export default SettingsModal;
