import { Dispatch, SetStateAction, useContext } from 'react';
import ModalBackgroundFrame from './ModalBackgroundFrame';
import SubmitButton from './SubmitButton';
import { DataContext } from '@/context/DataContext';

type SettingsModalProps = {
  setSettingsModal: Dispatch<SetStateAction<boolean>>;
};

const SettingsModal = ({ setSettingsModal }: SettingsModalProps) => {
  const { settings, updateSettings } = useContext(DataContext);

  return (
    <>
      <ModalBackgroundFrame action={() => setSettingsModal(false)} />
      <div className='fixed inset-0 z-50 mx-auto my-auto block h-fit w-[700px] rounded-xl bg-gray-700 p-5 text-left shadow-lg'>
        <form className='space-y-5' onSubmit={() => setSettingsModal(false)}>
          <div className='float-end space-x-3'>
            <SubmitButton />
          </div>
          <b>Settings</b>
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
            <label htmlFor='image_quality'>Image Quality (the higher, the slower the images load):</label>
            <input
              type='number'
              id='image_quality'
              value={settings.imageQuality}
              onChange={(e) => updateSettings('imageQuality', e.target.value)}
              className='ml-2 w-20 rounded-md border bg-transparent px-2'
              min={10}
              max={100}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingsModal;
