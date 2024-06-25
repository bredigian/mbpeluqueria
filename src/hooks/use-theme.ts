import { useEffect, useState } from 'react';

import { TTheme } from '@/types/themes.types';

export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(() => {
    const isEnabledByLocalStorage: TTheme | string | null =
      localStorage.getItem('theme');
    if (isEnabledByLocalStorage) return isEnabledByLocalStorage as TTheme;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark';

    return 'light';
  });

  const handleChangeTheme = () => {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark')
      document.getElementById('body')?.classList.add('dark');
    else document.getElementById('body')?.classList.remove('dark');
  }, [theme]);

  return {
    theme,
    handleChangeTheme,
  };
};
