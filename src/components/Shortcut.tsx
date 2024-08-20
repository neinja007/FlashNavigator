import { ShortcutType } from '@/app/page';
import { DataContext } from '@/context/DataContext';
import { addHTTPProtocolToUrl } from '@/utils/addHTTPProtocolToUrl';
import { convertUrlToExternalImageUrl } from '@/utils/convertUrlToExternalImageUrl';
import Image from 'next/image';
import { Dispatch, SetStateAction, useContext } from 'react';

type ShortcutProps = {
  setShortcutId: () => void;
  shortcut: ShortcutType;
  setGroups: Dispatch<SetStateAction<string[]>>;
  queryResult?: boolean;
  resetSearchBarQuery?: () => void;
};

const Shortcut = ({ setShortcutId, setGroups, queryResult, shortcut, resetSearchBarQuery }: ShortcutProps) => {
  const { settings } = useContext(DataContext);

  return (
    (!settings.hideEmptyShortcuts || shortcut.name || shortcut.href || shortcut.img) && (
      <div
        className='mb-3 aspect-square h-fit w-1/4 cursor-pointer rounded-lg pb-2 hover:bg-gray-700 md:w-1/6 xl:w-1/8'
        onContextMenu={(e) => {
          if (queryResult) return;
          e.preventDefault();
          setShortcutId();
        }}
        onClick={() => {
          if (shortcut.name) {
            if (shortcut.group) {
              if (queryResult) {
                if (!resetSearchBarQuery) throw new Error('resetSearchBarQuery is not defined');
                resetSearchBarQuery();
              }
              setGroups([...shortcut.path, shortcut.name]);
            } else if (shortcut.href) {
              window.location.href = addHTTPProtocolToUrl(shortcut.href);
            } else {
              !queryResult && setShortcutId();
            }
          } else {
            !queryResult && setShortcutId();
          }
        }}
      >
        <div className='relative mx-auto h-full w-full overflow-hidden rounded-t-lg'>
          {shortcut.img ? (
            <Image
              alt='The Icon has Failed to Load'
              className='m-auto h-fit max-h-20 w-full max-w-20 sm:max-h-24 sm:max-w-24 lg:max-h-32 lg:max-w-32'
              src={convertUrlToExternalImageUrl(shortcut.img)}
              fill
              sizes={(settings.imageQuality * 3).toString() + 'px'}
              quality={settings.imageQuality}
            />
          ) : (
            <span className='select-none text-6xl sm:text-9xl'>?</span>
          )}
        </div>
        <div className='h-12'>
          {shortcut.name ? (
            <b
              className={
                'line-clamp-2 ' +
                (settings.shortcutTypeColor ? (shortcut.group ? 'text-yellow-400' : 'text-blue-400') : 'text-white')
              }
            >
              {!settings.hideShortcutIcons && (shortcut.group ? '📁' : '🔗')} {shortcut.name}
            </b>
          ) : (
            <span className='cursor-pointer text-blue-300 underline'>Edit Shortcut</span>
          )}
        </div>
      </div>
    )
  );
};

export default Shortcut;
