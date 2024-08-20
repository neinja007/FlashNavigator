'use client';
import { ShortcutType } from '@/app/page';
import { getNestedShortcuts } from '@/utils/getNestedShortcuts';
import { useState, createContext, useEffect } from 'react';

type DataContextType = {
  shortcuts: ShortcutsType;
  updateShortcuts: (key: string, shortcut: ShortcutType | null) => void;
  settings: SettingsType;
  updateSettings: (key: keyof SettingsType, value: any) => void;
  refreshSettings: () => void;
  refreshShortcuts: () => void;
};

type ShortcutsType = { [key: string]: ShortcutType };

type SettingsType = {
  hideShortcutIcons: boolean;
  hideEmptyShortcuts: boolean;
  imageQuality: number;
  shortcutTypeColor: boolean;
};

type DataContextProviderProps = {
  children: React.ReactNode;
};

export const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [shortcuts, setShortcuts] = useState<ShortcutsType>({});
  const [settings, setSettings] = useState<SettingsType>({
    hideShortcutIcons: false,
    hideEmptyShortcuts: false,
    imageQuality: 75,
    shortcutTypeColor: false
  });

  useEffect(() => {
    refreshShortcuts();
    refreshSettings();
  }, []);

  useEffect(() => {
    localStorage.setItem('settings-hide_shortcut_icons', settings.hideShortcutIcons.toString());
    localStorage.setItem('settings-hide_empty_shortcuts', settings.hideEmptyShortcuts.toString());
    localStorage.setItem('settings-image_quality', settings.imageQuality.toString());
    localStorage.setItem('settings-shortcut_type_color', settings.shortcutTypeColor.toString());
  }, [settings]);

  const refreshShortcuts = () => {
    setShortcuts(getNestedShortcuts());
  };

  const refreshSettings = () => {
    setSettings({
      hideShortcutIcons: localStorage.getItem('settings-hide_shortcut_icons') === 'true',
      hideEmptyShortcuts: localStorage.getItem('settings-hide_empty_shortcuts') === 'true',
      imageQuality: parseInt(localStorage.getItem('settings-image_quality') || '75') || 75,
      shortcutTypeColor: localStorage.getItem('settings-shortcut_type_color') === 'true'
    });
  };

  const updateSettings = (key: keyof SettingsType, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateShortcuts = (key: string, shortcut: ShortcutType | null) => {
    if (!shortcut) {
      localStorage.removeItem(`shortcut-${key}-name`);
      localStorage.removeItem(`shortcut-${key}-group`);
      localStorage.removeItem(`shortcut-${key}-href`);
      localStorage.removeItem(`shortcut-${key}-img`);
    } else {
      localStorage.setItem(`shortcut-${key}-name`, shortcut.name);
      localStorage.setItem(`shortcut-${key}-group`, shortcut.group.toString());
      localStorage.setItem(`shortcut-${key}-href`, shortcut.href);
      localStorage.setItem(`shortcut-${key}-img`, shortcut.img);
    }
    refreshShortcuts();
  };

  return (
    <DataContext.Provider
      value={{ shortcuts, updateSettings, updateShortcuts, refreshSettings, refreshShortcuts, settings }}
    >
      {children}
    </DataContext.Provider>
  );
}
