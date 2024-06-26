'use client';

import { Label } from './ui/label';
import { Switch } from './ui/switch';

type Props = {
  theme: string;
  handleChangeTheme: () => void;
};

export default function ThemeSwitch({ theme, handleChangeTheme }: Props) {
  return (
    <div className='flex w-full items-center justify-between gap-4 p-2'>
      <Label htmlFor='dark-mode'>Tema oscuro</Label>
      <Switch
        id='dark-mode'
        onClick={handleChangeTheme}
        defaultChecked={theme === 'dark' ? true : false}
      />
    </div>
  );
}
