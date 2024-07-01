'use client';

import { Paragraph } from './ui/paragraph';
import { userStore } from '@/store/user.store';

export default function DashboardAdminParagraph() {
  const { name } = userStore();

  return (
    <Paragraph>
      ¡Hola, <strong>{name?.split(' ')[0]}</strong>! Este es tu menú principal,
      en el cual podrás gestionar lo que desees.
    </Paragraph>
  );
}
