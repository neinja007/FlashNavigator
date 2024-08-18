import { Dispatch, SetStateAction } from 'react';
import ModalBackgroundFrame from './ModalBackgroundFrame';
import { useStorageState } from '@/hooks/useStorageState';
import SubmitButton from './SubmitButton';

type SettingsModalProps = {
	setSettings: Dispatch<SetStateAction<boolean>>;
};

const SettingsModal = ({ setSettings }: SettingsModalProps) => {
	const [hideShortcutIcons, setHideShortcutIcons] = useStorageState('settings-hide_shortcut_icons', 'false');
	const [hideEmptyShortcuts, setHideEmptyShortcuts] = useStorageState('settings-hide_empty_shortcuts', 'false');
	const [imageQuality, setImageQuality] = useStorageState('settings-image_quality', '75');
	const [shortcutTypeColor, setShortcutTypeColor] = useStorageState('settings-shortcut_type_color', 'true');

	return (
		<>
			<ModalBackgroundFrame
				action={() => {
					setSettings(false);
					window.location.reload();
				}}
			/>
			<div className='fixed z-50 bg-gray-700 shadow-lg rounded-xl text-left p-5 inset-0 mx-auto my-auto w-[700px] h-fit block'>
				<form
					className='space-y-5'
					onSubmit={() => {
						setSettings(false);
						window.location.reload();
					}}
				>
					<div className='float-end space-x-3'>
						<SubmitButton />
					</div>
					<b>Settings</b>
					<div>
						<input
							type='checkbox'
							id='hide_shortcut_icons'
							checked={hideShortcutIcons === 'true'}
							onChange={(e) => setHideShortcutIcons(e.target.checked.toString())}
							className='mr-2'
						/>
						<label htmlFor='hide_shortcut_icons'>Hide Icons next to Shortcuts (📁 and 🔗)</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='hide_empty_shortcuts'
							checked={hideEmptyShortcuts === 'true'}
							onChange={(e) => setHideEmptyShortcuts(e.target.checked.toString())}
							className='mr-2'
						/>
						<label htmlFor='hide_empty_shortcuts'>Hide Empty Shortcuts</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='shortcut_type_color'
							checked={shortcutTypeColor === 'true'}
							onChange={(e) => setShortcutTypeColor(e.target.checked.toString())}
							className='mr-2'
						/>
						<label htmlFor='shortcut_type_color'>Different colors for Folders and Links</label>
					</div>
					<div>
						<label htmlFor='image_quality'>Image Quality (the higher, the slower the images load):</label>
						<input
							type='number'
							id='image_quality'
							value={imageQuality || 75}
							onChange={(e) => setImageQuality(e.target.value || '75')}
							className='ml-2 w-20 bg-transparent border px-2 rounded-md'
							min={0}
							max={100}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default SettingsModal;
