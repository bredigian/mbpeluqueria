'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';
import { LogoutDialog } from './navbar-dialog';
import SettingsIcon from './icons/settings-icon';
import ThemeSwitch from './theme-switch';

type Props = {
  isForAdmin?: boolean;
};

export default function Settings({ isForAdmin }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <SettingsIcon size={28} color='hsl(var(--primary))' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4'>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ThemeSwitch />
        </DropdownMenuGroup>
        {isForAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <LogoutDialog isAdmin />
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
