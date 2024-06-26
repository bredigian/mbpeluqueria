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
import { IoSettingsOutline } from 'react-icons/io5';
import { LogoutDialog } from './navbar-dialog';
import ThemeSwitch from './theme-switch';

type Props = {
  isForAdmin?: boolean;
};

export default function Settings({ isForAdmin }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <IoSettingsOutline size={24} />
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
