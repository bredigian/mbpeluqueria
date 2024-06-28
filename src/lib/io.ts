import { API_URL } from '@/constants/api';
import io from 'socket.io-client';

export const connectWebsocket = (name: string) =>
  io(API_URL as string, {
    query: {
      name,
    },
  });
