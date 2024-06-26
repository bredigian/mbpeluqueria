import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function verifyThemeByLocalStorage() {
  const theme = localStorage.getItem('theme');
  const body = document.getElementById('body');
  if (!body) return;

  if (theme)
    if (theme === 'dark') body.classList.add('dark');
    else body.classList.remove('dark');
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark');
  } else body.classList.remove('dark');
}
